// Resume Page JavaScript Functionality

// Download Resume as PDF
function downloadResume() {
    // Show loading state
    const downloadBtn = document.querySelector('.btn-download');
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    downloadBtn.disabled = true;

    // Simulate PDF generation (replace with actual PDF generation library)
    setTimeout(() => {
        // For now, we'll create a downloadable HTML version
        // In a real implementation, you'd use a library like jsPDF or html2pdf
        
        // Create a printable version of the resume
        const printWindow = window.open('', '_blank');
        const resumeContent = document.querySelector('.resume-main').innerHTML;
        const headerContent = document.querySelector('.resume-header').innerHTML;
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>chiranjeevi ronanki - Resume</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        line-height: 1.6;
                        color: #333;
                        margin: 0;
                        padding: 20px;
                        background: white;
                    }
                    .resume-header {
                        background: #f8f9fa;
                        padding: 20px;
                        margin-bottom: 20px;
                        border-bottom: 2px solid #333;
                    }
                    .resume-header h1 {
                        margin: 0 0 10px 0;
                        color: #333;
                        font-size: 24pt;
                    }
                    .resume-header h2 {
                        margin: 0 0 15px 0;
                        color: #666;
                        font-size: 14pt;
                    }
                    .contact-details {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 15px;
                        font-size: 10pt;
                    }
                    .resume-section {
                        margin-bottom: 20px;
                        page-break-inside: avoid;
                    }
                    .resume-section h3 {
                        color: #333;
                        border-bottom: 1px solid #ccc;
                        padding-bottom: 5px;
                        margin-bottom: 15px;
                    }
                    .experience-item, .education-item, .project-item {
                        margin-bottom: 15px;
                        padding: 15px;
                        border-left: 3px solid #007bff;
                        background: #f8f9fa;
                    }
                    .company-name {
                        color: #007bff;
                        font-weight: bold;
                    }
                    .skill-tag {
                        display: inline-block;
                        background: #007bff;
                        color: white;
                        padding: 3px 8px;
                        margin: 2px;
                        border-radius: 12px;
                        font-size: 9pt;
                    }
                    @media print {
                        body { margin: 0; }
                        .resume-section { page-break-inside: avoid; }
                    }
                </style>
            </head>
            <body>
                ${headerContent}
                ${resumeContent}
                <script>window.print();</script>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        
        // Reset button state
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
        
        // Show success message
        showNotification('Resume ready for download! Opening print dialog...', 'success');
        
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add print functionality
function addPrintButton() {
    const headerActions = document.querySelector('.header-actions');
    
    const printBtn = document.createElement('button');
    printBtn.className = 'btn btn-secondary';
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print';
    printBtn.onclick = () => window.print();
    
    headerActions.appendChild(printBtn);
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + P for print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
    
    // Ctrl/Cmd + S for download
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        downloadResume();
    }
});

// Add copy contact info functionality
function addCopyContactInfo() {
    const contactDetails = document.querySelector('.contact-details');
    
    contactDetails.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
            const text = e.target.textContent.replace(/^[^a-zA-Z0-9@.+()\s-]+/, '').trim();
            navigator.clipboard.writeText(text).then(() => {
                showNotification(`Copied: ${text}`, 'success');
            }).catch(() => {
                showNotification('Failed to copy to clipboard', 'error');
            });
        }
    });
    
    // Add copy icon to contact details
    contactDetails.querySelectorAll('span').forEach(span => {
        span.style.cursor = 'pointer';
        span.title = 'Click to copy';
    });
}

// Initialize all functionality when page loads
document.addEventListener('DOMContentLoaded', () => {
    addPrintButton();
    addCopyContactInfo();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    console.log('Resume page loaded successfully! 📄');
});

// Add CSS for loading state
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1e293b, #334155);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Loading Resume...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 10000;
    }
    
    .btn-secondary {
        background: transparent;
        color: #94a3b8;
        border: 1px solid #475569;
    }
    
    .btn-secondary:hover {
        background: #475569;
        color: white;
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(loadingStyle);

// Add smooth reveal animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe resume sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.resume-section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #2563eb, #3b82f6);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3);
    transition: all 0.3s ease;
    z-index: 1000;
`;
document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
    // const headerOffset = document.querySelector('header')?.offsetHeight || 80; // adjust 80 if your header is taller
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for back to top button
backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'scale(1.1)';
});
backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'scale(1)';
});