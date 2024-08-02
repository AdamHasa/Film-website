<template>
    <footer>
      <div class="footer-content">
        <p>© 2024 Company Name. All rights reserved.</p>
        <nav class="footer-nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <div class="social-media">
          <a href="https://github.com/AdamHasa/Film-website" target="_blank" rel="noopener noreferrer">Github</a>

        </div>
      </div>
    </footer>
  </template>
  
  <style scoped>
  footer {
    opacity: 1;
    background-color: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 100%;
    position: fixed;
    bottom: 0;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    max-width: 1200px;
  }
  
  .footer-content p, .footer-content a {
    color: white;
    margin: 0 10px;
    text-decoration: none;
  }
  
  .footer-nav a {
    margin-right: 15px;
  }
  
  .social-media a {
    margin-left: 15px;
  }
  </style>
  