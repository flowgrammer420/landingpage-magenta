# Landingpage n8n

A modern landing page project integrated with n8n automation workflows.

## 📁 Project Structure

```
landingpage-n8n/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── logo.png
├── components/
│   ├── header.html
│   ├── footer.html
│   └── form.html
├── n8n-workflows/
│   └── contact-form-workflow.json
├── index.html
├── README.md
└── .gitignore
```

## 🚀 Setup Instructions

### Prerequisites

- A web server (Apache, Nginx, or any static file server)
- n8n instance (self-hosted or cloud)
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/flowgrammer420/landingpage-n8n.git
   cd landingpage-n8n
   ```

2. **Configure n8n Integration**
   - Import the workflow from `n8n-workflows/contact-form-workflow.json` into your n8n instance
   - Update the webhook URL in `assets/js/main.js` with your n8n webhook endpoint
   - Activate the workflow in n8n

3. **Deploy the Landing Page**
   - Upload all files to your web server
   - Or serve locally:
     ```bash
     python -m http.server 8000
     # or
     npx serve .
     ```
   - Access via `http://localhost:8000`

### Configuration

1. **Update Contact Form**
   - Edit `components/form.html` to customize form fields
   - Modify validation rules in `assets/js/main.js`

2. **Customize Styling**
   - Edit `assets/css/style.css` for design changes
   - Update colors, fonts, and layout as needed

3. **n8n Workflow Setup**
   - Configure email notifications in the n8n workflow
   - Set up database connections if needed
   - Add additional automation steps

## 🔧 n8n Workflow Features

- Form data validation
- Email notifications
- CRM integration options
- Database storage
- Automated responses

## 📝 Usage

1. Users fill out the contact form on the landing page
2. Form data is sent to the n8n webhook
3. n8n processes the data according to the workflow
4. Automated actions are triggered (emails, database entries, etc.)

## 🛠️ Development

### Local Development

```bash
# Serve the site locally
python -m http.server 8000

# For live reload during development
npx live-server
```

### Testing n8n Integration

1. Ensure your n8n instance is running
2. Test the webhook endpoint manually:
   ```bash
   curl -X POST https://your-n8n-instance.com/webhook/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
   ```

## 📚 Resources

- [n8n Documentation](https://docs.n8n.io/)
- [n8n Webhook Node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
- [HTML Forms Guide](https://developer.mozilla.org/en-US/docs/Learn/Forms)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**flowgrammer420**

## 🐛 Issues

If you encounter any issues or have suggestions, please file an issue on the GitHub repository.
