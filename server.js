const express = require('express')

require('dotenv').config({path:'./config/.env'})
require("./config/db")

const mongoose = require('mongoose');
const { Schema } = mongoose;

const app = express()

app.use(express.json())
const port = process.env.PORT

// Creation person with prototype

const personSchema = new Schema({
    name: String, 
    age: Number,
    favoriteFoods: [String],
});
//creation du model Person
const Person = mongoose.model('Person', personSchema);
//creation d'un document sur le model person
const person = new Person({
    name: 'Mareme Mboup',
    age:23,
    favoriteFoods:['Salade']

 });
// //await person.save();
person
    .save()
    .then(console.log('Person adding succefully.'))
    .catch(err => {
        console.error(err)
    })
const arrayOfPeople = [
    {name:"Babacar Toure", age:17, favoriteFoods:['Pizza']},
    {name:"Fatou Sene",age:20, favoriteFoods:['Chawarman']},
    {name:"Mai Mboup",age:35, favoriteFoods:['Poulet','Benie']}
]
Person
    .create(arrayOfPeople)
    .then(console.log('Persons saving succefuly'))
    .catch((err) => {console.error(err);
    })

//recherche toutes les personnes
Person
    .find()
    .then(docs => {
        console.log('All persons in database',docs)
    })
    .catch(err => {
        console.error(err)
    })

//recherche une personne avec le plat préféré "Pastel"
Person
    .findOne({ favoriteFoods: {'$in':'Chawarman' }})
    .then(doc => {
        console.log('Personne trouvée.',doc)
    })
    .catch(err => {
        console.error(err)
    })
//recherche une personne par son id
var idUser = '6487b9c94be9633e71029420';
Person
    .findById(idUser)
    .then(doc => {
        console.log('Personne trouvée.',doc)
    })
    .catch(err => {
        console.error(err)
    })
//recherche par id puis ajout de plat
var id = '6487b9c94be9633e71029420';
Person
    .findById(id)
    .then(doc => {
        doc.favoriteFoods.push('Hamburger')
        doc.save()
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    })

//recherche par nom et mettre à jour l'âge
Person
    .findOneAndUpdate({name: 'Fatou Sene'}, { age: 25 },{ new: false })
    .then(doc =>{
        console.log('Age mis à jour:',doc)
    })
    .catch(err => {
        console.error(err)
    })

//supprimer la personne avec l'id "6467a38fa1aea7b38c7f99ed"
var idDel = '6487ba7497352e17c22e8c79'
Person
    .findByIdAndRemove(idDel)
    .then(console.log(`Personne avec l'id ${idDel} a été supprimée.`))
    .catch(err => {
        console.error(err)
    })

//supprimer toute les personnes avec le nom 'Mareme Mboup'
Person
    .deleteMany({name:'Mareme Mboup'})
    .then(console.log('Personne avec le nom Ibra GNING a été supprimée.'))
    .catch(err => {
        console.error(err)
    })

    //Trouvez des gens qui aiment la Salade. Triez-les par nom, limitez les résultats à deux documents et masquez leur ancienneté
    Person
        .find({ favoriteFoods: {'$in':'Salade'}})
        .sort('name')
        .limit(2)
        .select()
        .then(docs => {
            console.log('Les personnes qui aiment la salade:', docs)
        })
        .catch(err => {
            console.error(err)
        })
    
// Lancement du serveur dans le por 5000
app.listen(port, () => {
    console.log(`server is runnning in ${port}`)}
)


