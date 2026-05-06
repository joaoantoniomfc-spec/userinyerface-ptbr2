const fs = require('fs');

let file = fs.readFileSync('app.js', 'utf8');

// 🔹 Dicionário de tradução (pode expandir depois)
const translations = [
  // Botões
  ['Next', 'Continuar'],
  ['Cancel', 'Cancelar'],
  ['Validate', 'Validar'],
  ['Download image', 'Baixar imagem'],

  // Avatar / interesses
  ['This is me', 'Este sou eu'],
  ['To complete your profile, please', 'Para completar seu perfil, por favor'],
  ['upload', 'enviar'],
  ['Choose 3 interests', 'Escolha 3 interesses'],

  // Erros
  ['Please upload a picture', 'Por favor, envie uma imagem'],
  ['Please choose 3 interests.', 'Por favor, escolha 3 interesses'],

  // Cookies
  ['This site uses cookies, is that a problem for you?', 'Este site usa cookies. Isso é um problema para você?'],
  ['Not really, no', 'Não, tudo bem'],
  ['Yes', 'Sim'],

  // CAPTCHA
  ['Almost done! Now we just need proof that you are human.', 'Quase lá! Precisamos confirmar que você é humano.'],
  ['Select all pictures with a bow', 'Selecione todas as imagens com um laço'],
  ['Select all checks', 'Selecione todas as marcas'],
  ['Select all pictures with a circle', 'Selecione todas as imagens com um círculo'],
  ['Select all pictures with glasses', 'Selecione todas as imagens com óculos'],
  ['Select all light pictures', 'Selecione todas as imagens de luz'],

  // Final
  ['You are awesome!', 'Você mandou muito bem!'],
  ['A true interface legend.', 'Um verdadeiro mestre de interfaces.']
];

// 🔹 Função segura de substituição
translations.forEach(([en, pt]) => {
  const regex = new RegExp(`>${en}<`, 'g');
  file = file.replace(regex, `>${pt}<`);

  const regex2 = new RegExp(`"${en}"`, 'g');
  file = file.replace(regex2, `"${pt}"`);
});

// 🔹 Salva novo arquivo
fs.writeFileSync('app-translated.js', file);

console.log('✅ Tradução concluída: app-translated.js');