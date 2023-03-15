class Bird {
    constructor(id, name, description, species, image, audio) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.description = description;
        this.image = image;
        this.audio = audio;
    }
}

module.exports = Bird;