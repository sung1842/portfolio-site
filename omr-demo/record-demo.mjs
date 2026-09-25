import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const out = path.dirname(fileURLToPath(import.meta.url));
const stills = path.join(out, "stills");
const videoDir = path.join(out, "video");
const formPdf = path.join(out, "1234.pdf");
await mkdir(stills, { recursive: true });
await mkdir(videoDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ["--hide-scrollbars"],
});
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  recordVideo: { dir: videoDir, size: { width: 1920, height: 1080 } },
  locale: "ko-KR",
  colorScheme: "dark",
});
const page = await context.newPage();
await page.emulateMedia({ colorScheme: "dark" });

async function still(name) {
  await page.screenshot({ path: path.join(stills, `${name}.png`) });
}

async function pause(ms) {
  await page.waitForTimeout(ms);
}

async function dragImageRegion(x0, y0, x1, y1) {
  const info = await page.evaluate(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) {
      return null;
    }
    const r = canvas.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  });
  if (!info) {
    throw new Error("canvas missing");
  }
  const imgAspect = 1191 / 1684;
  const canvasAspect = info.w / info.h;
  let drawW;
  let drawH;
  let offX;
  let offY;
  if (canvasAspect > imgAspect) {
    drawH = info.h;
    drawW = info.h * imgAspect;
    offX = (info.w - drawW) / 2;
    offY = 0;
  } else {
    drawW = info.w;
    drawH = info.w / imgAspect;
    offX = 0;
    offY = (info.h - drawH) / 2;
  }
  const sx0 = info.x + offX + x0 * drawW;
  const sy0 = info.y + offY + y0 * drawH;
  const sx1 = info.x + offX + x1 * drawW;
  const sy1 = info.y + offY + y1 * drawH;
  await page.mouse.move(sx0, sy0);
  await pause(250);
  await page.mouse.down();
  await page.mouse.move(sx1, sy1, { steps: 28 });
  await pause(200);
  await page.mouse.up();
  await pause(600);
}

await page.setContent(
  '<html style="background:#000;height:100%"><body style="background:#000;margin:0"></body></html>',
);
await pause(400);

await page.goto("https://omr-program.vercel.app/login", {
  waitUntil: "domcontentloaded",
  timeout: 90000,
});
await page.evaluate(() => {
  document.documentElement.style.background = "#000";
  document.body.style.background = "#000";
});
await page.getByPlaceholder("관리자 아이디").waitFor({ timeout: 30000 });
await pause(2200);
await still("01-login");

await page.getByPlaceholder("관리자 아이디").click();
await page.getByPlaceholder("관리자 아이디").fill("test1234");
await pause(400);
await page.getByPlaceholder("비밀번호").fill("12345678");
await pause(400);
await page.getByRole("button", { name: /로그인/ }).click();
await page.getByRole("button", { name: "현황" }).waitFor({ timeout: 30000 });
await pause(3200);
await still("02-status");

await page.getByRole("button", { name: "대량 처리" }).click();
await pause(2800);
await still("03-scan");

await page.getByRole("link", { name: "양식 등록" }).click();
await page.getByPlaceholder("예: 주민제안 마을의제 투표").waitFor({ timeout: 20000 });
await pause(1600);
await still("04-template-empty");

await page.getByPlaceholder("예: 주민제안 마을의제 투표").fill("1234 양식");
await pause(500);
await page.locator('input[type="file"]').first().setInputFiles(formPdf);
await page.getByText("1234.pdf").waitFor({ timeout: 30000 });
await pause(3500);
await still("05-template-loaded");

await page.getByRole("button", { name: /Next/ }).click();
await pause(2800);
await still("06-corners");

await page.getByRole("button", { name: /Next/ }).click();
await page.getByRole("button", { name: "Find circles" }).waitFor({ timeout: 15000 });
await pause(1200);

const questions = [
  {
    title: "프로그램 사업 특화",
    exclusive: true,
    min: 1,
    max: 1,
    box: [0.855, 0.165, 0.985, 0.255],
  },
  {
    title: "프로그램 사업 일반",
    exclusive: false,
    min: 1,
    max: 4,
    box: [0.855, 0.275, 0.985, 0.555],
  },
  {
    title: "시설 사업",
    exclusive: true,
    min: 1,
    max: 1,
    box: [0.855, 0.565, 0.985, 0.64],
  },
];

for (let i = 0; i < questions.length; i += 1) {
  const q = questions[i];
  if (i > 0) {
    await page.getByRole("button", { name: "Add" }).click();
    await pause(700);
  }
  const title = page.locator("label.wizard-field").filter({ hasText: "Title" }).locator("input");
  await title.fill(q.title);
  await pause(300);
  if (q.exclusive) {
    await page.getByRole("button", { name: "Single" }).click();
  } else {
    await page.getByRole("button", { name: "Multiple" }).click();
    await pause(250);
    const maxInput = page.locator("label.wizard-field").filter({ hasText: "Max" }).locator("input");
    await maxInput.fill(String(q.max));
  }
  const minInput = page.locator("label.wizard-field").filter({ hasText: "Min" }).locator("input");
  await minInput.fill(String(q.min));
  await pause(400);
  await dragImageRegion(q.box[0], q.box[1], q.box[2], q.box[3]);
  await still(`07-q${i + 1}-box`);
  await page.getByRole("button", { name: "Find circles" }).click();
  await page
    .getByText(/원 \d+개를 찾았습니다|원을 찾지 못했습니다|원 검출을 실행하지 못했습니다/)
    .waitFor({ timeout: 45000 })
    .catch(() => undefined);
  await pause(1800);
  await still(`08-q${i + 1}-circles`);
}

await page.getByRole("button", { name: /Next/ }).click();
await pause(2800);
await still("09-review");

const saveBtn = page.getByRole("button", { name: /Save/ });
if (await saveBtn.isEnabled()) {
  await saveBtn.click();
  await page.getByText("대량 스캔 처리").waitFor({ timeout: 30000 });
  await pause(2500);
  await still("10-scan-after-save");
} else {
  console.log("save-disabled");
  await still("10-save-disabled");
  await page.goto("https://omr-program.vercel.app/scan", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await pause(2500);
}

const scanFile = page.locator(".scan-panel input[type='file']");
if ((await scanFile.count()) === 0) {
  await page.locator("input[type='file']").last().setInputFiles(formPdf);
} else {
  await scanFile.setInputFiles(formPdf);
}
await pause(3500);
await still("11-scan-uploaded");

const analyze = page.getByRole("button", { name: /분석 시작|처리 중/ });
if (await analyze.isEnabled()) {
  await analyze.click();
  await pause(1500);
  await still("12-scan-running");
  await page.getByRole("button", { name: "분석 시작" }).waitFor({ timeout: 120000 });
  await pause(2800);
  await still("13-scan-done");
} else {
  console.log("analyze-disabled");
  await still("12-analyze-disabled");
}

await page.getByRole("button", { name: "현황" }).click();
await pause(3500);
await still("14-status-after");

await page.getByRole("button", { name: "예외 확인" }).click();
await pause(3200);
await still("15-exceptions");

await page.getByRole("button", { name: "대량 처리" }).click();
await pause(2500);
await still("16-scan-final");

await context.close();
await browser.close();
console.log("demo-capture-done");
