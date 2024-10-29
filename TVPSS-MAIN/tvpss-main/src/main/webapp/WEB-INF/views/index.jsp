<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login - TVPSS</title>
    <link href="https://cdn.jsdelivr.net/npm/@mui/material@5.14.7/dist/mui-material.min.css" rel="stylesheet">
    <style>
        .container {
            background-color: #F8FAFF;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .paper {
            padding: 2rem;
            width: 500px;
            border: 1px solid #e0e0e0;
            background: white;
            border-radius: 4px;
        }
        .logo-container {
            display: flex;
            justify-content: flex-start;
            margin: 1rem 0;
        }
        .form-field {
            width: 100%;
            margin: 1rem 0;
        }
        .error-alert {
            background-color: #fdeded;
            color: #5f2120;
            padding: 0.75rem;
            border-radius: 4px;
            margin-bottom: 1rem;
        }
        .submit-button {
            width: 100%;
            margin-top: 1.5rem;
            padding: 0.75rem;
            background-color: #1976d2;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .forgot-password {
            text-align: center;
            margin-top: 1rem;
        }
        .forgot-password a {
            color: grey;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div>
            <div class="paper">
                <div class="logo-container">
                    <img src="${pageContext.request.contextPath}/resources/LogoTVPSS.svg" alt="logo" height="100">
                </div>
                
                <% if (request.getAttribute("error") != null) { %>
                    <div class="error-alert">
                        <%= request.getAttribute("error") %>
                    </div>
                <% } %>

                <form action="${pageContext.request.contextPath}/login" method="POST">
                    <div class="form-field">
                        <label for="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required 
                            pattern=".*@moe\.gov\.my$"
                            title="Email must end with @moe.gov.my"
                        >
                    </div>

                    <div class="form-field">
                        <label for="password">Kata Laluan</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            required
                        >
                    </div>

                    <div>
                        <input type="checkbox" id="remember" name="remember">
                        <label for="remember">Ingat Saya</label>
                    </div>

                    <button type="submit" class="submit-button">
                        Log Masuk
                    </button>

                    <div class="forgot-password">
                        <a href="${pageContext.request.contextPath}/lupaKataLaluan.jsp">Lupa Kata Laluan</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>