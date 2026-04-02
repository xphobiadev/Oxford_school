const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.vue') || file.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Map common FontAwesome icons to Phosphor
            const iconMap = {
                'fa-home': 'ph-house',
                'fa-graduation-cap': 'ph-graduation-cap',
                'fa-star': 'ph-star',
                'fa-briefcase': 'ph-briefcase',
                'fa-info-circle': 'ph-info',
                'fa-facebook-f': 'ph-facebook-logo',
                'fa-instagram': 'ph-instagram-logo',
                'fa-youtube': 'ph-youtube-logo',
                'fa-linkedin-in': 'ph-linkedin-logo',
                'fa-whatsapp': 'ph-whatsapp-logo',
                'fa-tiktok': 'ph-tiktok-logo',
                'fa-chevron-right': 'ph-caret-right',
                'fa-chevron-left': 'ph-caret-left',
                'fa-chevron-down': 'ph-caret-down',
                'fa-phone': 'ph-phone',
                'fa-envelope': 'ph-envelope',
                'fa-location-dot': 'ph-map-pin',
                'fa-bars': 'ph-list',
                'fa-times': 'ph-x',
                'fa-map-marker-alt': 'ph-map-pin',
                'fa-clock': 'ph-clock',
                'fa-calendar': 'ph-calendar',
                'fa-hand-pointer': 'ph-cursor-click',
                'fa-file-alt': 'ph-file-text',
                'fa-file-pdf': 'ph-file-pdf',
                'fa-cloud-upload-alt': 'ph-cloud-arrow-up',
                'fa-comment': 'ph-chat-circle',
                'fa-spinner': 'ph-spinner',
                'fa-check': 'ph-check',
                'fa-file-contract': 'ph-file-text',
                'fa-shield-alt': 'ph-shield',
                'fa-paper-plane': 'ph-paper-plane-right',
                'fa-chalkboard-teacher': 'ph-chalkboard-teacher',
                'fa-book-open': 'ph-book-open',
                'fa-laptop-code': 'ph-laptop',
                'fa-arrow-right': 'ph-arrow-right',
                'fa-arrow-left': 'ph-arrow-left',
                'fa-globe': 'ph-globe',
                'fa-users': 'ph-users',
                'fa-heart': 'ph-heart',
                'fa-lightbulb': 'ph-lightbulb',
                'fa-quote-left': 'ph-quotes',
                'fa-moon': 'ph-moon',
                'fa-sun': 'ph-sun'
            };

            let updated = false;

            // Replace fa- classes
            content = content.replace(/(fas|fab|far)\s+(fa-[a-z0-9-]+)/g, (match, prefix, iconName) => {
                updated = true;
                const newName = iconMap[iconName] || iconName.replace('fa-', 'ph-');
                const style = prefix === 'far' ? 'ph' : 'ph-fill';
                return `${style} ${newName}`;
            });

            if (updated) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated icons in: ${fullPath}`);
            }
        }
    }
}

// Start from the app directory
processDirectory(path.join(__dirname, 'app'));
console.log('Icon replacement complete!');
