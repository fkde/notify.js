import de from './translation/de.json' with {type: 'json'};
import en from './translation/en.json' with {type: 'json'};

class Translator {

    translate(slug) {
        return de[slug] || en[slug] || slug;
    }

}

export default function translate(key) {

    const translator = new Translator();
    return translator.translate(key);

};