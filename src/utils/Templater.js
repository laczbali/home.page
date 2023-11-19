import fs from 'fs';

export function renderTemplate(templatePath, data) {
    let template = fs.readFileSync(templatePath, 'utf8');
    Object.keys(data).forEach(dataPoint => {
        template = template.replace(`{{${dataPoint}}}`, data[dataPoint]);
    });
    return template;
}