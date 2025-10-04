# LOCKDOWN
//A Event management system 
\<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EventFlow - Intelligent Event Management</title>
    <meta name="description" content="EventFlow is an intelligent event management platform that streamlines your entire event lifecycle with AI-powered features.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        :root {
            --primary: #7c3aed;
            --secondary: #6d28d9;
            --accent: #8b5cf6;
            --dark-bg: #0f0f23;
            --dark-card: #1a1a2e;
            --dark-text: #e2e8f0;
            --dark-border: #2d3748;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
        }

        body {
            background-color: var(--dark-bg);
            color: var(--dark-text);
            line-height: 1.6;
            overflow-x: hidden;
        }

        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Header Styles */
        header {
            background: rgba(15, 15, 35, 0.95);
            color: white;
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--dark-border);
            transition: all 0.3s ease;
        }

        .header-scrolled {
            padding: 0.5rem 0;
            background: rgba(15, 15, 35, 0.98);
        }

        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 1.8rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            cursor: pointer;
        }

        .logo i {
            margin-right: 10px;
            color: var(--accent);
            text-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }

        .nav-links {
            display: flex;
            list-style: none;
        }

        .nav-links li {
            margin-left: 2rem;
        }

        .nav-links a {
            color: var(--dark-text);
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s;
            position: relative;
        }

        .nav-links a:hover {
            color: var(--accent);
        }

        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--accent);
            transition: width 0.3s;
        }

        .nav-links a:hover::after {
            width: 100%;
        }

        .nav-links a.active {
            color: var(--accent);
        }

        .nav-links a.active::after {
            width: 100%;
        }

        .cta-button {
            background: linear-gradient(135deg, var(--primary), var(--accent));
            color: white;
            border: none;
            padding: 0.7rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(124, 58, 237, 0.6);
        }

        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        }

        /* Hero Section */
        .hero {
            padding: 6rem 0;
            background: linear-gradient(rgba(15, 15, 35, 0.9), rgba(26, 26, 46, 0.9)), url('https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80');
            background-size: cover;
            background-position: center;
            color: white;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 30% 20%, rgba(124, 58, 237, 0.2) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%);
        }

        .hero-content {
            position: relative;
            z-index: 1;
        }

        .hero h1 {
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
            line-height: 1.2;
            background: linear-gradient(to right, #fff, var(--accent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s ease;
        }

        .hero p {
            font-size: 1.3rem;
            max-width: 700px;
            margin: 0 auto 2rem;
            color: #cbd5e0;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s ease 0.2s;
        }

        .hero-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s ease 0.4s;
        }

        .hero.animate h1,
        .hero.animate p,
        .hero.animate .hero-buttons {
            opacity: 1;
            transform: translateY(0);
        }

        .secondary-button {
            background-color: transparent;
            color: white;
            border: 2px solid var(--accent);
            padding: 0.7rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }

        .secondary-button:hover {
            background-color: var(--accent);
            color: white;
            transform: translateY(-2px);
        }

        /* Features Section */
        .section {
            padding: 5rem 0;
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }

        .section.animate {
            opacity: 1;
            transform: translateY(0);
        }

        .section-title {
            text-align: center;
            margin-bottom: 3rem;
        }

        .section-title h2 {
            font-size: 2.5rem;
            color: var(--accent);
            margin-bottom: 1rem;
        }

        .section-title p {
            color: #a0aec0;
            max-width: 700px;
            margin: 0 auto;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .feature-card {
            background: var(--dark-card);
            border-radius: 12px;
            padding: 2.5rem 2rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            transition: all 0.3s;
            border: 1px solid var(--dark-border);
            position: relative;
            overflow: hidden;
            opacity: 0;
            transform: translateY(20px);
        }

        .feature-card.animate {
            opacity: 1;
            transform: translateY(0);
        }

        .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(to right, var(--primary), var(--accent));
        }

        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
            border-color: var(--accent);
        }

        .feature-icon {
            background: linear-gradient(135deg, var(--primary), var(--accent));
            width: 70px;
            height: 70px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            box-shadow: 0 5px 15px rgba(124, 58, 237, 0.4);
        }

        .feature-icon i {
            font-size: 1.8rem;
            color: white;
        }

        .feature-card h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: white;
        }

        .feature-card p {
            color: #a0aec0;
        }

        /* AI Section */
        .ai-section {
            background: linear-gradient(135deg, var(--dark-bg), #151530);
            position: relative;
            overflow: hidden;
        }

        .ai-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 20% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 50%);
        }

        .ai-content {
            display: flex;
            align-items: center;
            gap: 3rem;
            position: relative;
            z-index: 1;
        }

        .ai-text {
            flex: 1;
        }

        .ai-text h2 {
            font-size: 2.5rem;
            color: var(--accent);
            margin-bottom: 1.5rem;
        }

        .ai-text p {
            margin-bottom: 1.5rem;
            color: #a0aec0;
        }

        .ai-visual {
            flex: 1;
            background: var(--dark-card);
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            border: 1px solid var(--dark-border);
        }

        .ai-feature {
            display: flex;
            align-items: center;
            margin-bottom: 1.5rem;
            padding: 1rem;
            border-radius: 8px;
            transition: all 0.3s;
            cursor: pointer;
        }

        .ai-feature:hover {
            background: rgba(124, 58, 237, 0.1);
        }

        .ai-feature i {
            background: linear-gradient(135deg, var(--primary), var(--accent));
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            box-shadow: 0 4px 10px rgba(124, 58, 237, 0.4);
        }

        /* Dashboard Styles */
        .dashboard {
            background: var(--dark-card);
            border-radius: 12px;
            padding: 2rem;
            margin: 2rem 0;
            border: 1px solid var(--dark-border);
        }

        .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }

        .dashboard-title {
            font-size: 1.5rem;
            color: white;
        }

        .dashboard-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            padding: 1.5rem;
            text-align: center;
            border: 1px solid var(--dark-border);
        }

        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            color: var(--accent);
            margin-bottom: 0.5rem;
        }

        .stat-label {
            color: #a0aec0;
            font-size: 0.9rem;
        }

        .stat-trend {
            font-size: 0.8rem;
            margin-top: 0.5rem;
        }

        .trend-up {
            color: var(--success);
        }

        .trend-down {
            color: var(--danger);
        }

        .dashboard-charts {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }

        .chart-container {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            padding: 1.5rem;
            border: 1px solid var(--dark-border);
        }

        .chart-title {
            color: white;
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }

        .chart-placeholder {
            height: 200px;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #a0aec0;
        }

        .predictive-insights {
            background: rgba(139, 92, 246, 0.1);
            border-radius: 8px;
            padding: 1.5rem;
            margin-top: 1.5rem;
            border-left: 4px solid var(--accent);
        }

        .insights-title {
            color: white;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .insights-list {
            list-style: none;
        }

        .insights-list li {
            margin-bottom: 0.8rem;
            padding-left: 1.5rem;
            position: relative;
            color: #a0aec0;
        }

        .insights-list li:before {
            content: '→';
            position: absolute;
            left: 0;
            color: var(--accent);
        }

        /* Testimonials */
        .testimonials {
            background: var(--dark-bg);
        }

        .testimonial-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .testimonial-card {
            background: var(--dark-card);
            border-radius: 12px;
            padding: 2.5rem 2rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            border: 1px solid var(--dark-border);
            transition: all 0.3s;
            opacity: 0;
            transform: translateY(20px);
        }

        .testimonial-card.animate {
            opacity: 1;
            transform: translateY(0);
        }

        .testimonial-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
            border-color: var(--accent);
        }

        .testimonial-text {
            font-style: italic;
            margin-bottom: 1.5rem;
            color: #a0aec0;
            position: relative;
        }

        .testimonial-text::before {
            content: '"';
            font-size: 4rem;
            color: var(--accent);
            position: absolute;
            top: -20px;
            left: -10px;
            opacity: 0.3;
        }

        .testimonial-author {
            display: flex;
            align-items: center;
        }

        .author-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            margin-right: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(124, 58, 237, 0.4);
        }

        .author-info h4 {
            margin-bottom: 0.2rem;
            color: white;
        }

        .author-info p {
            color: #718096;
            font-size: 0.9rem;
        }

        /* Pricing Section */
        .pricing {
            background: var(--dark-bg);
        }

        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .pricing-card {
            background: var(--dark-card);
            border-radius: 12px;
            padding: 2.5rem 2rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            border: 1px solid var(--dark-border);
            transition: all 0.3s;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .pricing-card.popular {
            border-color: var(--accent);
            transform: scale(1.05);
        }

        .pricing-card.popular::before {
            content: 'Most Popular';
            position: absolute;
            top: 0;
            right: 0;
            background: var(--accent);
            color: white;
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
            font-weight: 600;
            border-bottom-left-radius: 8px;
        }

        .pricing-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
        }

        .pricing-card.popular:hover {
            transform: scale(1.05) translateY(-10px);
        }

        .pricing-header {
            margin-bottom: 2rem;
        }

        .pricing-name {
            font-size: 1.5rem;
            color: white;
            margin-bottom: 0.5rem;
        }

        .pricing-price {
            font-size: 3rem;
            font-weight: 700;
            color: var(--accent);
            margin-bottom: 0.5rem;
        }

        .pricing-price span {
            font-size: 1.5rem;
            vertical-align: super;
        }

        .pricing-period {
            color: #a0aec0;
        }

        .pricing-features {
            list-style: none;
            margin-bottom: 2rem;
        }

        .pricing-features li {
            margin-bottom: 1rem;
            color: #a0aec0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .pricing-features li i {
            color: var(--success);
            margin-right: 0.5rem;
        }

        /* CTA Section */
        .cta-section {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            text-align: center;
            padding: 5rem 0;
            position: relative;
            overflow: hidden;
        }

        .cta-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="%23ffffff" opacity="0.05"><polygon points="1000,100 1000,0 0,100"></polygon></svg>');
            background-size: cover;
        }

        .cta-content {
            position: relative;
            z-index: 1;
        }

        .cta-section h2 {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
        }

        .cta-section p {
            max-width: 700px;
            margin: 0 auto 2rem;
            font-size: 1.2rem;
            color: #e2e8f0;
        }

        /* Signup Page */
        .signup-page {
            display: none;
            padding: 6rem 0;
            min-height: 100vh;
            background: var(--dark-bg);
        }

        .signup-container {
            max-width: 500px;
            margin: 0 auto;
        }

        .signup-card {
            background: var(--dark-card);
            border-radius: 12px;
            padding: 3rem;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            border: 1px solid var(--dark-border);
        }

        .signup-header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .signup-header h2 {
            color: var(--accent);
            margin-bottom: 0.5rem;
        }

        .signup-header p {
            color: #a0aec0;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--dark-text);
            font-weight: 500;
        }

        .form-group input,
        .form-group select {
            width: 100%;
            padding: 0.75rem;
            border-radius: 8px;
            border: 1px solid var(--dark-border);
            background: var(--dark-bg);
            color: var(--dark-text);
            font-size: 1rem;
            transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus {
            outline: none;
            border-color: var(--accent);
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .form-footer {
            text-align: center;
            margin-top: 2rem;
        }

        .login-link {
            color: #a0aec0;
            margin-top: 1.5rem;
        }

        .login-link a {
            color: var(--accent);
            text-decoration: none;
        }

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .modal.active {
            display: flex;
            opacity: 1;
        }

        .modal-content {
            background: var(--dark-card);
            border-radius: 12px;
            padding: 2rem;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            border: 1px solid var(--dark-border);
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }

        .modal.active .modal-content {
            transform: scale(1);
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }

        .modal-header h3 {
            color: var(--accent);
            font-size: 1.5rem;
        }

        .close-modal {
            background: none;
            border: none;
            color: var(--dark-text);
            font-size: 1.5rem;
            cursor: pointer;
            transition: color 0.3s;
        }

        .close-modal:hover {
            color: var(--accent);
        }

        /* Footer */
        footer {
            background: #0a0a1a;
            color: white;
            padding: 4rem 0 2rem;
            border-top: 1px solid var(--dark-border);
        }

        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .footer-column h3 {
            margin-bottom: 1.5rem;
            font-size: 1.2rem;
            color: var(--accent);
        }

        .footer-links {
            list-style: none;
        }

        .footer-links li {
            margin-bottom: 0.8rem;
        }

        .footer-links a {
            color: #a0aec0;
            text-decoration: none;
            transition: color 0.3s;
        }

        .footer-links a:hover {
            color: var(--accent);
        }

        .social-links {
            display: flex;
            gap: 1rem;
        }

        .social-links a {
            color: white;
            background: rgba(255, 255, 255, 0.1);
            width: 40px;
            height: 40px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
        }

        .social-links a:hover {
            background: var(--accent);
            transform: translateY(-3px);
        }

        .copyright {
            text-align: center;
            padding-top: 2rem;
            border-top: 1px solid var(--dark-border);
            color: #718096;
            font-size: 0.9rem;
        }

        /* Back to Top Button */
        .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: var(--accent);
            color: white;
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
            z-index: 99;
        }

        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }

        .back-to-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(124, 58, 237, 0.6);
        }

        /* Loading Animation */
        .loading {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--dark-bg);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }

        .loading.hidden {
            opacity: 0;
            visibility: hidden;
        }

        .spinner {
            width: 70px;
            height: 70px;
            border: 5px solid rgba(139, 92, 246, 0.3);
            border-radius: 50%;
            border-top-color: var(--accent);
            animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .navbar {
                flex-direction: column;
                gap: 1rem;
            }

            .nav-links {
                margin-top: 1rem;
                flex-wrap: wrap;
                justify-content: center;
                display: none;
                flex-direction: column;
                width: 100%;
                text-align: center;
            }

            .nav-links.active {
                display: flex;
            }

            .nav-links li {
                margin: 0.5rem;
            }

            .mobile-menu-btn {
                display: block;
                position: absolute;
                top: 1rem;
                right: 1rem;
            }

            .hero h1 {
                font-size: 2.5rem;
            }

            .hero p {
                font-size: 1.1rem;
            }

            .hero-buttons {
                flex-direction: column;
                align-items: center;
            }

            .ai-content {
                flex-direction: column;
            }

            .dashboard-charts {
                grid-template-columns: 1fr;
            }

            .pricing-card.popular {
                transform: scale(1);
            }

            .pricing-card.popular:hover {
                transform: translateY(-10px);
            }

            .form-row {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- Loading Animation -->
    <div class="loading" id="loading">
        <div class="spinner"></div>
    </div>

    <!-- Header -->
    <header id="header">
        <div class="container">
            <nav class="navbar">
                <div class="logo" id="logo">
                    <i class="fas fa-stream"></i>
                    EventFlow
                </div>
                <button class="mobile-menu-btn" id="mobileMenuBtn">
                    <i class="fas fa-bars"></i>
                </button>
                <ul class="nav-links" id="navLinks">
                    <li><a href="#home" class="active">Home</a></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#ai">AI Solutions</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                    <li><a href="#testimonials">Testimonials</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <button class="cta-button" id="getStartedBtn">Get Started</button>
            </nav>
        </div>
    </header>

    <!-- Main Content -->
    <main id="mainContent">
        <!-- Hero Section -->
        <section class="hero" id="home">
            <div class="container hero-content">
                <h1>Event Management at Your Fingertips</h1>
                <p>One intelligent platform to streamline your entire event lifecycle. Collaborate seamlessly with all stakeholders and create unforgettable experiences.</p>
                <div class="hero-buttons">
                    <button class="cta-button" id="startPlanningBtn">Start Planning</button>
                    <button class="secondary-button" id="watchDemoBtn">Watch Demo</button>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="section" id="features">
            <div class="container">
                <div class="section-title">
                    <h2>Transform Your Event Experience</h2>
                    <p>EventFlow eliminates the chaos of disconnected tools by creating a single intelligent platform for all your event needs.</p>
                </div>
                <div class="features-grid" id="featuresGrid">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-comments"></i>
                        </div>
                        <h3>Real-time Collaboration</h3>
                        <p>Bring organizers, vendors, sponsors, and attendees together in one platform with seamless communication tools.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-database"></i>
                        </div>
                        <h3>Centralized Data Hub</h3>
                        <p>All event information in one place - from attendee lists to vendor contracts and sponsorship details.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-calendar-alt"></i>
                        </div>
                        <h3>Smart Scheduling</h3>
                        <p>AI-powered scheduling that automatically finds optimal times and prevents conflicts across all stakeholders.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-handshake"></i>
                        </div>
                        <h3>Vendor Integration</h3>
                        <p>Connect with preferred vendors, manage contracts, and track deliverables all within the platform.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-cogs"></i>
                        </div>
                        <h3>Automated Workflows</h3>
                        <p>Streamline repetitive tasks with customizable automation that saves time and reduces errors.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <h3>AI-Powered Analytics</h3>
                        <p>Gain valuable insights with predictive analytics and personalized recommendations for better events.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- AI Section -->
        <section class="section ai-section" id="ai">
            <div class="container">
                <div class="ai-content">
                    <div class="ai-text">
                        <h2>Intelligent Event Management Powered by AI</h2>
                        <p>Our advanced AI algorithms transform how you plan, execute, and analyze events.</p>
                        
                        <div class="ai-feature" id="aiFeature1">
                            <i class="fas fa-brain"></i>
                            <div>
                                <h3>Predictive Planning</h3>
                                <p>AI analyzes past events to forecast attendance, budget needs, and potential challenges.</p>
                            </div>
                        </div>
                        
                        <div class="ai-feature" id="aiFeature2">
                            <i class="fas fa-user-friends"></i>
                            <div>
                                <h3>Personalized Experiences</h3>
                                <p>Create tailored event journeys for each attendee based on their preferences and behavior.</p>
                            </div>
                        </div>
                        
                        <div class="ai-feature" id="aiFeature3">
                            <i class="fas fa-chart-pie"></i>
                            <div>
                                <h3>Post-Event Insights</h3>
                                <p>Comprehensive analytics that measure ROI, engagement, and satisfaction across all touchpoints.</p>
                            </div>
                        </div>
                        
                        <button class="cta-button" id="discoverAIBtn">Discover AI Features</button>
                    </div>
                    <div class="ai-visual">
                        <h3>Event Performance Dashboard</h3>
                        <div class="dashboard">
                            <div class="dashboard-stats">
                                <div class="stat-card">
                                    <div class="stat-value">1,247</div>
                                    <div class="stat-label">Current Attendees</div>
                                    <div class="stat-trend trend-up">+12% from yesterday</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-value">78%</div>
                                    <div class="stat-label">Engagement Rate</div>
                                    <div class="stat-trend trend-up">+5% this week</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-value">₹2.4L</div>
                                    <div class="stat-label">Revenue Generated</div>
                                    <div class="stat-trend trend-up">+18% vs target</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-value">92%</div>
                                    <div class="stat-label">Satisfaction Score</div>
                                    <div class="stat-trend trend-down">-2% from last event</div>
                                </div>
                            </div>
                            
                            <div class="dashboard-charts">
                                <div class="chart-container">
                                    <div class="chart-title">Attendance Trend</div>
                                    <div class="chart-placeholder">
                                        <i class="fas fa-chart-line" style="font-size: 2rem; color: var(--accent);"></i>
                                        <span style="margin-left: 10px;">Real-time Attendance Chart</span>
                                    </div>
                                </div>
                                <div class="chart-container">
                                    <div class="chart-title">Engagement by Session</div>
                                    <div class="chart-placeholder">
                                        <i class="fas fa-chart-bar" style="font-size: 2rem; color: var(--accent);"></i>
                                        <span style="margin-left: 10px;">Session Performance</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="predictive-insights">
                                <div class="insights-title">
                                    <i class="fas fa-lightbulb"></i>
                                    AI-Powered Insights
                                </div>
                                <ul class="insights-list">
                                    <li>Session B is trending 23% higher engagement than expected</li>
                                    <li>Predicted final attendance: 1,850 (95% confidence)</li>
                                    <li>Recommend adding capacity to Workshop C based on demand</li>
                                    <li>Food & beverage consumption 15% below forecast - adjust orders</li>
                                </ul>
                            </div>
                        </div>
                        <p>Real-time metrics and predictive insights to optimize your event strategy.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Pricing Section -->
        <section class="section pricing" id="pricing">
            <div class="container">
                <div class="section-title">
                    <h2>Simple, Transparent Pricing</h2>
                    <p>Choose the plan that works best for your organization. All plans include core features.</p>
                </div>
                <div class="pricing-grid">
                    <div class="pricing-card">
                        <div class="pricing-header">
                            <h3 class="pricing-name">Starter</h3>
                            <div class="pricing-price">₹<span>3,499</span></div>
                            <div class="pricing-period">per month</div>
                        </div>
                        <ul class="pricing-features">
                            <li><i class="fas fa-check"></i> Up to 100 attendees</li>
                            <li><i class="fas fa-check"></i> Basic event templates</li>
                            <li><i class="fas fa-check"></i> Email support</li>
                            <li><i class="fas fa-check"></i> Basic analytics</li>
                        </ul>
                        <button class="cta-button" style="width: 100%;" data-plan="starter">Get Started</button>
                    </div>
                    <div class="pricing-card popular">
                        <div class="pricing-header">
                            <h3 class="pricing-name">Professional</h3>
                            <div class="pricing-price">₹<span>6,999</span></div>
                            <div class="pricing-period">per month</div>
                        </div>
                        <ul class="pricing-features">
                            <li><i class="fas fa-check"></i> Up to 500 attendees</li>
                            <li><i class="fas fa-check"></i> Advanced event templates</li>
                            <li><i class="fas fa-check"></i> Priority support</li>
                            <li><i class="fas fa-check"></i> AI-powered recommendations</li>
                            <li><i class="fas fa-check"></i> Vendor management</li>
                        </ul>
                        <button class="cta-button" style="width: 100%;" data-plan="professional">Get Started</button>
                    </div>
                    <div class="pricing-card">
                        <div class="pricing-header">
                            <h3 class="pricing-name">Enterprise</h3>
                            <div class="pricing-price">₹<span>14,999</span></div>
                            <div class="pricing-period">per month</div>
                        </div>
                        <ul class="pricing-features">
                            <li><i class="fas fa-check"></i> Unlimited attendees</li>
                            <li><i class="fas fa-check"></i> Custom event templates</li>
                            <li><i class="fas fa-check"></i> 24/7 dedicated support</li>
                            <li><i class="fas fa-check"></i> Advanced AI analytics</li>
                            <li><i class="fas fa-check"></i> API access</li>
                            <li><i class="fas fa-check"></i> White-label options</li>
                        </ul>
                        <button class="cta-button" style="width: 100%;" data-plan="enterprise">Get Started</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials -->
        <section class="section testimonials" id="testimonials">
            <div class="container">
                <div class="section-title">
                    <h2>Trusted by Event Professionals</h2>
                    <p>See how EventFlow has transformed event management for organizations worldwide.</p>
                </div>
                <div class="testimonial-grid" id="testimonialGrid">
                    <div class="testimonial-card">
                        <div class="testimonial-text">
                            "EventFlow eliminated our coordination headaches. We now manage conferences with 5,000+ attendees seamlessly across teams."
                        </div>
                        <div class="testimonial-author">
                            <div class="author-avatar">SM</div>
                            <div class="author-info">
                                <h4>Sarah Mitchell</h4>
                                <p>Event Director, TechConf Global</p>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-card">
                        <div class="testimonial-text">
                            "The AI recommendations have helped us increase sponsorship revenue by 32% while reducing planning time by 45%."
                        </div>
                        <div class="testimonial-author">
                            <div class="author-avatar">JR</div>
                            <div class="author-info">
                                <h4>James Rodriguez</h4>
                                <p>Head of Events, Innovate Inc.</p>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-card">
                        <div class="testimonial-text">
                            "Vendor management used to be our biggest challenge. With EventFlow, we've streamlined our entire supply chain."
                        </div>
                        <div class="testimonial-author">
                            <div class="author-avatar">EP</div>
                            <div class="author-info">
                                <h4>Elena Petrov</h4>
                                <p>Operations Manager, Festive Events Co.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="cta-section" id="contact">
            <div class="container cta-content">
                <h2>Ready to Transform Your Events?</h2>
                <p>Join thousands of event professionals who have streamlined their workflow with EventFlow's intelligent platform.</p>
                <button class="cta-button" id="freeTrialBtn" style="background: white; color: var(--primary);">Start Your Free Trial</button>
            </div>
        </section>
    </main>

    <!-- Signup Page -->
    <section class="signup-page" id="signupPage">
        <div class="container signup-container">
            <div class="signup-card">
                <div class="signup-header">
                    <h2>Start Your Free Trial</h2>
                    <p>Get full access to all EventFlow features for 14 days</p>
                </div>
                <form id="signupForm">
                    <div class="form-group">
                        <label for="fullName">Full Name</label>
                        <input type="text" id="fullName" name="fullName" required placeholder="Enter your full name">
                    </div>
                    
                    <div class="form-group">
                        <label for="companyName">Company Name</label>
                        <input type="text" id="companyName" name="companyName" required placeholder="Enter your company name">
                    </div>
                    
                    <div class="form-group">
                        <label for="workEmail">Work Email</label>
                        <input type="email" id="workEmail" name="workEmail" required placeholder="Enter your work email">
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="phoneNumber">Phone Number</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" required placeholder="Enter your phone number">
                        </div>
                        
                        <div class="form-group">
                            <label for="companySize">Company Size</label>
                            <select id="companySize" name="companySize" required>
                                <option value="">Select company size</option>
                                <option value="1-10">1-10 employees</option>
                                <option value="11-50">11-50 employees</option>
                                <option value="51-200">51-200 employees</option>
                                <option value="201-500">201-500 employees</option>
                                <option value="501+">501+ employees</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="eventType">Primary Event Type</label>
                        <select id="eventType" name="eventType" required>
                            <option value="">Select event type</option>
                            <option value="conference">Conferences</option>
                            <option value="corporate">Corporate Events</option>
                            <option value="wedding">Weddings</option>
                            <option value="trade-show">Trade Shows</option>
                            <option value="virtual">Virtual Events</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Create Password</label>
                        <input type="password" id="password" name="password" required placeholder="Create a secure password">
                    </div>
                    
                    <div class="form-group">
                        <label>
                            <input type="checkbox" name="terms" required>
                            I agree to the <a href="#" style="color: var(--accent);">Terms of Service</a> and <a href="#" style="color: var(--accent);">Privacy Policy</a>
                        </label>
                    </div>
                    
                    <div class="form-group">
                        <label>
                            <input type="checkbox" name="newsletter">
                            Send me product updates and event management tips
                        </label>
                    </div>
                    
                    <button type="submit" class="cta-button" style="width: 100%;">Start My Free Trial</button>
                    
                    <div class="login-link">
                        Already have an account? <a href="#" id="loginLink">Log in</a>
                    </div>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <h3>EventFlow</h3>
                    <p>The all-in-one intelligent platform for seamless event management and collaboration.</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div class="footer-column">
                    <h3>Solutions</h3>
                    <ul class="footer-links">
                        <li><a href="#">Corporate Events</a></li>
                        <li><a href="#">Conferences</a></li>
                        <li><a href="#">Trade Shows</a></li>
                        <li><a href="#">Festivals</a></li>
                        <li><a href="#">Virtual Events</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Resources</h3>
                    <ul class="footer-links">
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Case Studies</a></li>
                        <li><a href="#">Webinars</a></li>
                        <li><a href="#">Event Guides</a></li>
                        <li><a href="#">Support Center</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Company</h3>
                    <ul class="footer-links">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Partners</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                <p>&copy; 2025 EventFlow. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Back to Top Button -->
    <button class="back-to-top" id="backToTop">
        <i class="fas fa-arrow-up"></i>
    </button>

    <!-- Modal -->
    <div class="modal" id="demoModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Watch EventFlow Demo</h3>
                <button class="close-modal" id="closeModal">&times;</button>
            </div>
            <div class="modal-body">
                <div style="background: var(--dark-bg); height: 300px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; border: 1px solid var(--dark-border);">
                    <i class="fas fa-play-circle" style="font-size: 4rem; color: var(--accent);"></i>
                </div>
                <p>See how EventFlow can transform your event management process in just 5 minutes.</p>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" placeholder="Enter your email to watch the demo">
                </div>
                <button class="cta-button" style="width: 100%;">Watch Demo Now</button>
            </div>
        </div>
    </div>

    <script>
        // DOM Elements
        const header = document.getElementById('header');
        const logo = document.getElementById('logo');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        const getStartedBtn = document.getElementById('getStartedBtn');
        const startPlanningBtn = document.getElementById('startPlanningBtn');
        const watchDemoBtn = document.getElementById('watchDemoBtn');
        const discoverAIBtn = document.getElementById('discoverAIBtn');
        const freeTrialBtn = document.getElementById('freeTrialBtn');
        const backToTop = document.getElementById('backToTop');
        const demoModal = document.getElementById('demoModal');
        const closeModal = document.getElementById('closeModal');
        const heroSection = document.querySelector('.hero');
        const sections = document.querySelectorAll('.section');
        const featureCards = document.querySelectorAll('.feature-card');
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const aiFeatures = document.querySelectorAll('.ai-feature');
        const mainContent = document.getElementById('mainContent');
        const signupPage = document.getElementById('signupPage');
        const signupForm = document.getElementById('signupForm');
        const loginLink = document.getElementById('loginLink');
        const pricingButtons = document.querySelectorAll('.pricing-card .cta-button');
        const loading = document.getElementById('loading');

        // Current page state
        let currentPage = 'home';

        // Loading animation
        window.addEventListener('load', () => {
            setTimeout(() => {
                loading.classList.add('hidden');
            }, 1000);
        });

        // Scroll Event Listener
        window.addEventListener('scroll', () => {
            // Header scroll effect
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            // Back to top button visibility
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }

            // Hero section animation
            if (window.scrollY < 100 && currentPage === 'home') {
                heroSection.classList.add('animate');
            }

            // Section animations
            if (currentPage === 'home') {
                sections.forEach(section => {
                    const sectionTop = section.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (sectionTop < windowHeight * 0.85) {
                        section.classList.add('animate');
                        
                        // Animate feature cards
                        if (section.id === 'features') {
                            featureCards.forEach((card, index) => {
                                setTimeout(() => {
                                    card.classList.add('animate');
                                }, index * 150);
                            });
                        }
                        
                        // Animate testimonial cards
                        if (section.id === 'testimonials') {
                            testimonialCards.forEach((card, index) => {
                                setTimeout(() => {
                                    card.classList.add('animate');
                                }, index * 150);
                            });
                        }
                    }
                });

                // Update active nav link
                updateActiveNavLink();
            }
        });

        // Update active navigation link based on scroll position
        function updateActiveNavLink() {
            const scrollPosition = window.scrollY;
            
            document.querySelectorAll('.nav-links a').forEach(link => {
                const section = document.querySelector(link.getAttribute('href'));
                if (section) {
                    const sectionTop = section.offsetTop - 100;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                }
            });
        }

        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                
                if (currentPage === 'home') {
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
            });
        });

        // Back to top functionality
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Modal functionality
        function openModal() {
            demoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModalFunc() {
            demoModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        watchDemoBtn.addEventListener('click', openModal);
        closeModal.addEventListener('click', closeModalFunc);
        demoModal.addEventListener('click', (e) => {
            if (e.target === demoModal) {
                closeModalFunc();
            }
        });

        // Show signup page
        function showSignupPage(plan = null) {
            currentPage = 'signup';
            mainContent.style.display = 'none';
            signupPage.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // If a plan was selected, you could pre-select it here
            if (plan) {
                console.log('Selected plan:', plan);
                // You could highlight the selected plan in the form
            }
        }

        // Show home page
        function showHomePage() {
            currentPage = 'home';
            mainContent.style.display = 'block';
            signupPage.style.display = 'none';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Button click handlers
        getStartedBtn.addEventListener('click', () => {
            showSignupPage();
        });

        startPlanningBtn.addEventListener('click', () => {
            if (currentPage === 'home') {
                window.scrollTo({
                    top: document.getElementById('features').offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });

        discoverAIBtn.addEventListener('click', () => {
            if (currentPage === 'home') {
                window.scrollTo({
                    top: document.getElementById('ai').offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });

        freeTrialBtn.addEventListener('click', () => {
            showSignupPage();
        });

        // Pricing buttons
        pricingButtons.forEach(button => {
            button.addEventListener('click', () => {
                const plan = button.getAttribute('data-plan');
                showSignupPage(plan);
            });
        });

        // Login link
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real app, this would show a login form
            alert('Login functionality would be implemented here');
        });

        // Signup form submission
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, this would submit to a backend
            alert('Thank you for signing up! Your free trial has been activated.');
            // Redirect to dashboard or show success message
        });

        // Logo click handler
        logo.addEventListener('click', () => {
            if (currentPage === 'signup') {
                showHomePage();
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });

        // AI Features interaction
        aiFeatures.forEach(feature => {
            feature.addEventListener('click', () => {
                // Remove active class from all features
                aiFeatures.forEach(f => f.style.background = 'transparent');
                
                // Add active class to clicked feature
                feature.style.background = 'rgba(124, 58, 237, 0.2)';
            });
        });

        // Initialize animations on page load
        window.addEventListener('load', () => {
            heroSection.classList.add('animate');
            
            // Trigger scroll event to check initial positions
            window.dispatchEvent(new Event('scroll'));
        });

        // Add some interactive effects to feature cards
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.feature-icon');
                icon.style.transform = 'scale(1.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.feature-icon');
                icon.style.transform = 'scale(1)';
            });
        });

        // Simulate real-time updates for the dashboard
        function updateDashboardStats() {
            if (currentPage === 'home') {
                const attendeesElement = document.querySelector('.stat-card:nth-child(1) .stat-value');
                const engagementElement = document.querySelector('.stat-card:nth-child(2) .stat-value');
                
                // Simulate small random changes
                const currentAttendees = parseInt(attendeesElement.textContent.replace(',', ''));
                const newAttendees = currentAttendees + Math.floor(Math.random() * 10);
                attendeesElement.textContent = newAttendees.toLocaleString();
                
                const currentEngagement = parseInt(engagementElement.textContent.replace('%', ''));
                const newEngagement = Math.min(100, Math.max(70, currentEngagement + Math.floor(Math.random() * 6 - 2)));
                engagementElement.textContent = newEngagement + '%';
            }
        }

        // Update dashboard every 5 seconds
        setInterval(updateDashboardStats, 5000);
    </script>
</body>
</html>
