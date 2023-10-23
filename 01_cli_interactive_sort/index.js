import * as readline from 'node:readline/promises';
import {
  stdin as input,
  stdout as output,
} from 'node:process';

const operations = [
  'Sort words alphabetically',
  'Show numbers from lesser to greater',
  'Show numbers from bigger to smaller',
  'Display words in ascending order by number of letters in the word',
  'Show only unique words',
  'Display only unique values from the set of words and numbers entered by the user'
]

const operationsText = operations.map((operation, idx) => `${idx + 1}. ${operation}`).join('\n')

const rl = readline.createInterface({ input, output });

const getWords = async () => {
  const inputText = await rl.question(
    'Enter a few words or numbers separated by a space (or type "exit" to quit): '
  );

  if (inputText.toLowerCase() === 'exit') {
    rl.close();
  } else {
    const words = inputText.split(' ').filter(word => word !== '');

    await operationInput(words);
    await getWords();
  }
}

const operationInput = async (words) => {
  if (words.length) {
    const operationId = await rl.question(
      `How would you like to sort values:\n${operationsText}\n\nSelect (1-5) and press ENTER: `
    );

    switch (operationId) {
      case '1':
        console.log('Sorted alphabetically:',
          words.sort());
        break;
      case '2':
        console.log('Numbers from lesser to greater:',
          words.filter(word => !isNaN(word)).sort((a, b) => a - b));
        break;
      case '3':
        console.log('Numbers from bigger to smaller:',
          words.filter(word => !isNaN(word)).sort((a, b) => b - a));
        break;
      case '4':
        console.log('Words in ascending order by the number of letters:',
          words.filter(word => isNaN(word)).sort((a, b) => a.length - b.length));
        break;
      case '5':
        console.log('Unique words:',
          [...new Set(words.filter(word => isNaN(word)))]);
        break;
      case '6':
        console.log('Unique values:',
          [...new Set(words)]);
        break;
      default:
        console.log('Invalid choice. Please choose a valid option.');
        await operationInput(words);
        break;
    }

  } else {
    console.log('You have not entered a word. Try again');
    await getWords();
  }
}

getWords();


