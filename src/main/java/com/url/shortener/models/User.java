package com.url.shortener.models;

import com.url.shortener.repository.UserRepository;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String username;
    private String password;
    private String role = "ROLE_USER";
}