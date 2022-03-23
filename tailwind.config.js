module.exports = {
    content: ['./src/**/*.{html,js,ts,hbs,handlebars}'],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms'), require('daisyui'), require('prettier-plugin-tailwindcss')],
};
