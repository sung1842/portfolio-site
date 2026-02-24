package com.example.backend.controller;

import com.example.backend.dto.ProjectResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/projects")
    public List<ProjectResponse> getProjects() {
        System.out.println("API 호출됨!");
        return Arrays.asList(
            new ProjectResponse(1L, "테스트 프로젝트 1", "설명 1"),
            new ProjectResponse(2L, "테스트 프로젝트 2", "설명 2")
        );
    }
}