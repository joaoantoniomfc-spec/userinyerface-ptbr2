const fs = require('fs');

const inputFile = 'app.js';
const outputFile = 'app-translated-ux.js';

let file = fs.readFileSync(inputFile, 'utf8');

const replacements = [
  // Botões dentro de templates
  ['>Next</ui-button>', '>Continuar</ui-button>'],
  ['>Cancel</ui-button>', '>Voltar</ui-button>'],
  ['>Validate</ui-button>', '>Validar</ui-button>'],
  ['>Download image</ui-button>', '>Baixar imagem</ui-button>'],

  // CAPTCHA
  ['Almost done! Now we just need proof that you are human.', 'Quase lá! Precisamos confirmar que você é humano.'],
  ["title: 'Select all pictures with a bow'", "title: 'Selecione todas as imagens com um laço'"],
  ["title: 'Select all checks'", "title: 'Selecione todas as marcas de verificação'"],
  ["title: 'Select all pictures with a circle'", "title: 'Selecione todas as imagens com um círculo'"],
  ["title: 'Select all pictures with glasses'", "title: 'Selecione todas as imagens com óculos'"],
  ["title: 'Select all light pictures'", "title: 'Selecione todas as imagens claras'"],

  // Cookies
  ['>This site uses cookies, is that a problem for you?</p>', '>Este site usa cookies. Você aceita o uso de cookies?</p>'],
  ['>Not really, no</ui-button>', '>Aceitar</ui-button>'],
  ['>Yes</ui-button>', '>Recusar</ui-button>'],

  // Avatar e interesses
  ['>This is me</h2>', '>Foto do perfil</h2>'],
  ['>To complete your profile, please <a @click=onClickUpload class=avatar-and-interests__upload-button>upload</a> any image.</p>', '>Para completar seu perfil, <a @click=onClickUpload class=avatar-and-interests__upload-button>envie</a> uma imagem.</p>'],
  ['>Choose 3 interests</h2>', '>Escolha 3 interesses</h2>'],
  ['>Please upload a picture</li>', '>Envie uma imagem para continuar</li>'],
  ['>Please choose 3 interests.</li>', '>Escolha exatamente 3 interesses para continuar.</li>'],

  // Tela final
  ['>You are awesome!</h1>', '>Você concluiu o processo!</h1>'],
  ['>A true interface legend.</h2>', '>Cadastro finalizado com sucesso.</h2>'],

  // Dados pessoais — labels, sem alterar keys/types
  ["label: 'First name', key: 'firstname'", "label: 'Nome', key: 'firstname'"],
  ["label: 'Zip', key: 'zip'", "label: 'CEP', key: 'zip'"],
  ["label: 'Title', key: 'title'", "label: 'Tratamento', key: 'title'"],
  ["emptyValue: \"Choose a title\"", "emptyValue: \"Escolha um tratamento\""],
  ["label: 'City', key: 'city'", "label: 'Cidade', key: 'city'"],
  ["label: 'Surname', key: 'surname'", "label: 'Sobrenome', key: 'surname'"],
  ["label: 'Country', key: 'country'", "label: 'País', key: 'country'"],
  ["label: 'Street', key: 'street'", "label: 'Rua', key: 'street'"],
  ["label: 'Box', key: 'box'", "label: 'Complemento', key: 'box'"],
  ["label: 'Number', key: 'number'", "label: 'Número', key: 'number'"],
  ["label: 'Birthdate', key: 'birthdate'", "label: 'Data de nascimento', key: 'birthdate'"],
  ["label: 'Age', type: 'slider', key: 'age'", "label: 'Idade', type: 'slider', key: 'age'"],
  ["label: 'Gender', type: 'gender', key: 'gender'", "label: 'Gênero', type: 'gender', key: 'gender'"],

  // Título da seção
  ['<h3>Personal details</h3>', '<h3>Dados pessoais</h3>'],

  // País / data
  ["return this.emptyValue || 'Choose a country';", "return this.emptyValue || 'Escolha um país';"],
  ["label: 'Day',", "label: 'Dia',"],
  ["label: 'Month',", "label: 'Mês',"],
  ["label: 'Year',", "label: 'Ano',"],

  // Botões gênero — manter nomes de atributos, mudar só valores
  ['left-option=Male right-option=Female', 'left-option=Masculino right-option=Feminino'],

  // Mensagens de erro dos dados pessoais
  ["errors.push('No title selected');", "errors.push('Nenhum tratamento selecionado');"],
  ["errors.push('Invalid last name');", "errors.push('Sobrenome inválido');"],
  ["errors.push('Invalid street');", "errors.push('Rua inválida');"],
  ["errors.push('Invalid zip/postal code');", "errors.push('CEP inválido');"],
  ["errors.push('Invalid city');", "errors.push('Cidade inválida');"],
  ["errors.push('No country selected');", "errors.push('Nenhum país selecionado');"],
  ["errors.push('No valid date selected');", "errors.push('Nenhuma data válida selecionada');"],
  ["errors.push('Age and birth date don\\'t match');", "errors.push('A idade e a data de nascimento não correspondem');"],
  ["errors.push('Gender and title don\\'t match');", "errors.push('O gênero e o tratamento não correspondem');"],
    // Timer modal
  ['>Hurry up, time is ticking!</h2>', '>Rápido, o tempo está passando!</h2>'],
  ['>Unlock</ui-button>', '>Desbloquear</ui-button>'],
  ['>Lock</ui-button>', '>Bloquear</ui-button>'],

  // Formulário de ajuda
  ['>How can we help?</h2>', '>Como podemos ajudar?</h2>'],
  ['placeholder=Help', 'placeholder=Ajuda'],
  ['>Send to bottom</button>', '>Enviar para baixo</button>'],

  // Tratamento / título
  ["items: ['Mr', 'Mrs']", "items: ['Sr.', 'Sra.']"],
  ['>Mr<', '>Sr.<'],
  ['>Mrs<', '>Sra.<'],

  // Interesses restantes
  ["label: 'Ponies'", "label: 'Pôneis'"],
  ["label: 'Polo'", "label: 'Polo'"],
  ["label: 'Dough'", "label: 'Massa'"],
  ["label: 'Snails'", "label: 'Caracóis'"],
  ["label: 'Balls'", "label: 'Bolas'"],
  ["label: 'Post-its'", "label: 'Post-its'"],
  ["label: 'Faucets'", "label: 'Torneiras'"],
  ["label: 'Enveloppes'", "label: 'Envelopes'"],
  ["label: 'Cables'", "label: 'Cabos'"],
  ["label: 'Questions'", "label: 'Perguntas'"],
  ["label: 'Squares'", "label: 'Quadrados'"],
  ["label: 'Purple'", "label: 'Roxo'"],
  ["label: 'Cotton'", "label: 'Algodão'"],
  ["label: 'Dry-wall'", "label: 'Drywall'"],
  ["label: 'Closets'", "label: 'Armários'"],
  ["label: 'Tires'", "label: 'Pneus'"],
  ["label: 'Windows'", "label: 'Janelas'"],
  ["label: 'Mullets'", "label: 'Mullets'"],
  ["label: 'Cinnamon'", "label: 'Canela'"],
  ["label: 'Select all'", "label: 'Selecionar tudo'"],
  ["label: 'Unselect all'", "label: 'Desmarcar tudo'"],
    // Página 1 — login e senha
  ['>Choose Password<', '>Crie sua senha<'],
  ['placeholder="Your email"', 'placeholder="Seu e-mail"'],
  ['placeholder=Your email', 'placeholder=Seu e-mail'],
  ['>Domain<', '>Domínio<'],
  ['>other<', '>outro<'],

  // Dark pattern: mantém o sentido original da versão ruim
  ['>I do not accept the Terms & Conditions<', '>Eu não aceito os Termos e Condições<'],

  // Botões página 1
  ['>Next</ui-button>', '>Continuar</ui-button>'],
  ['>Reset</ui-button>', '>Limpar</ui-button>'],

  // Regras da senha
  ["message: 'Your password requires at least 10 characters.'",
   "message: 'Sua senha precisa ter pelo menos 10 caracteres.'"],

  ["message: 'Your password should have at least 1 Capital letter.'",
   "message: 'Sua senha deve ter pelo menos 1 letra maiúscula.'"],

  ["message: 'Your password must have at least 1 Numeral.'",
   "message: 'Sua senha precisa ter pelo menos 1 número.'"],

  ["message: 'Your password needs at least 1 letter of your email.'",
   "message: 'Sua senha precisa conter pelo menos 1 letra do seu e-mail.'"],

  ["message: 'Your password can have at least 1 cyrillic character.'",
   "message: 'Sua senha pode conter pelo menos 1 caractere cirílico.'"],

  // Pop-up de ajuda
  ['placeholder=Help', 'placeholder=Ajuda'],
  ['placeholder="Help"', 'placeholder="Ajuda"'],
  ['>Help<', '>Ajuda<'],
  ['>Send to bottom</button>', '>Enviar para baixo</button>'],
    // 🔹 Página 1 (todas variações possíveis)

  // Password / login
  ['Choose Password', 'Crie sua senha'],
  ['Your email', 'Seu e-mail'],
  ['Domain', 'Domínio'],
  ['other', 'outro'],

  // Checkbox termos (dark pattern mantido)
  ['I do not accept the Terms & Conditions', 'Eu não aceito os Termos e Condições'],

  // Botões (cobrir todas variações)
  ['>Next<', '>Continuar<'],
  ['Next"', 'Continuar"'],
  ['Next ', 'Continuar '],

  ['>Reset<', '>Limpar<'],
  ['Reset"', 'Limpar"'],
  ['Reset ', 'Limpar '],

  // Help
  ['Send to bottom', 'Enviar para baixo'],
  ['Help', 'Ajuda'],

  // Placeholder genérico
  ['Placeholder...', 'Digite aqui...'],

  // 🔹 Erros de formulário (todas variações)
  ['Invalid first name', 'Nome inválido'],
  ['Invalid last name', 'Sobrenome inválido'],
  ['Invalid street', 'Rua inválida'],
  ['Invalid zip/postal code', 'CEP inválido'],
  ['Invalid city', 'Cidade inválida'],
    // Help form — botão restante
  ['Send to bottom', 'Enviar para baixo'],
  ['>Send to bottom<', '>Enviar para baixo<'],
  ['value="Send to bottom"', 'value="Enviar para baixo"'],

  // Terms checkbox — texto e termos internos
  ['I do not accept the Terms & Conditions', 'Eu não aceito os Termos e Condições'],
  ['I do not accept the <a @click=onTermsAndConditionsClick>Terms & Conditions</a>',
   'Eu não aceito os <a @click=onTermsAndConditionsClick>Termos e Condições</a>'],
  ['>Terms & Conditions<', '>Termos e Condições<'],
  ['Terms & Conditions', 'Termos e Condições'],
];

for (const [from, to] of replacements) {
  file = file.split(from).join(to);
}

fs.writeFileSync(outputFile, file, 'utf8');

console.log(`✅ Arquivo gerado com segurança: ${outputFile}`);  