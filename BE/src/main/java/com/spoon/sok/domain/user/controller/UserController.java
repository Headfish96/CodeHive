package com.spoon.sok.domain.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @PostMapping("/login/user")
    public ResponseEntity<?> login(@RequestBody UserRequestDto requestDto) {
        return userService.login(requestDto);
    }
}
