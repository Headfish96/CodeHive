package com.spoon.sok.config;

import com.spoon.sok.domain.user.auth.OAuth2AuthenticationFailureHandler;
import com.spoon.sok.domain.user.auth.OAuth2AuthenticationSuccessHandler;
import com.spoon.sok.domain.user.repository.CookieAuthorizationRequestRepository;
import com.spoon.sok.domain.user.service.CustomOAuth2UserService;
import com.spoon.sok.util.JwtAuthenticationFilter;
import com.spoon.sok.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;

    private final CustomOAuth2UserService customOAuth2UserService;
    private final CookieAuthorizationRequestRepository cookieAuthorizationRequestRepository;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .httpBasic((httpBasic) -> {
                    httpBasic.disable();
                })
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .formLogin((formLogin) -> {
                    formLogin.disable();
                })
                .rememberMe((rememberMe) -> {
                    rememberMe.disable();
                })
                .sessionManagement((sessionManagement) -> {
                    sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                })
                .authorizeHttpRequests((authorizeRequests) -> {
                    authorizeRequests.requestMatchers("/**",
                                    "/api/login/user",
                                    "/oauth2/**",
                                    "/api/reissue",
                                    "/api/signup",
                                    "/api/check/**",
                                    "/api/email/**",
                                    "/api/find/password",
                                    "/api/study/invite/pre-check").permitAll()
                            .anyRequest().authenticated();
                })
                .oauth2Login((oauth2) -> {
                    oauth2.authorizationEndpoint((endpoint) -> {
                        endpoint.baseUri("/oauth2/authorize");
                        endpoint.authorizationRequestRepository(cookieAuthorizationRequestRepository);
                    });
                    oauth2.redirectionEndpoint((endpoint) -> {
                        endpoint.baseUri("/oauth2/callback/*");
                    });
                    oauth2.userInfoEndpoint((endpoint) -> {
                        endpoint.userService(customOAuth2UserService);
                    });
                    oauth2.successHandler(oAuth2AuthenticationSuccessHandler);
                    oauth2.failureHandler(oAuth2AuthenticationFailureHandler);
                })
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, redisTemplate), UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}