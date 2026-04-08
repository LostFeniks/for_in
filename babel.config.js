module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current',
        browsers: ['last 2 versions']
      },
      modules: false // Сохраняем ES-модули для tree shaking
    }]
  ]
};