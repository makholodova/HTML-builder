const fs = require("fs");
const readline = require('readline');
const path = require("path");

const textPath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(textPath);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Добро пожаловать! Введите текст (или "exit" для выхода):');

rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    rl.close();
  } else {
    output.write(input + '\n');
  }
});

rl.on('close', () => {
  console.log('Запись выполнена! До свидания!');
  output.close();
});

process.on('SIGINT', () => {
  rl.close();
  output.close();
});

