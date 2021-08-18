const fs = require('fs');
const path = require('path');
const jsonFilePath = path.normalize('data/quran.json');
let raw_data = fs.readFileSync(jsonFilePath);
let productCatalogFromJson = JSON.parse(raw_data);

const quaidFilePath = path.normalize('data/quaid.json');
let quaid_raw_data = fs.readFileSync(quaidFilePath);
let allQuaidFromJson = JSON.parse(quaid_raw_data);



// Starting Loop to generate MD Files

productCatalogFromJson.forEach(loopFunctionForMDGenerator)

function loopFunctionForMDGenerator(item, index, arr) {
    console.log('MD File Created for ' + arr[index].name);
    //Get Current Vendor Code and Product Code In Loop
    const SurahName = arr[index].name;
    // Quaid Json File
    quaidProJsonFile = " ";

    //Aya Loop
    arr[index].aya.forEach(function(item, ayaIndex, ayaArr){
        
            var quaidContent = " ";

            //Check Quaid
            allQuaidFromJson.quaids.forEach(function(itm, ind, ar){
                
                
                
        
                if(ayaArr[ayaIndex].text.includes(ar[ind].matchingWord)){
                    console.log('Quaid Matched ' + ar[ind].name + 'Successfully!');
                    if(quaidContent == " "){
                        
                        quaidContent = ar[ind].description + "," + ar[ind].voice;
                    
                    }else{

                        quaidContent = quaidContent + "," +  ar[ind].description + "," + ar[ind].voice;
                    
                    }
                }


            });


            quaidProJsonFile = quaidProJsonFile + '{{%expand "'+ ayaArr[ayaIndex].text +'" %}}' + quaidContent + '{{% /expand%}}';


            

    });

    var frontMatter =   '---\ntitle: "' + arr[index].name + '"\ndraft: false\n---\n';

    fs.writeFile('content/surah-'+ arr[index].index +'.md',(frontMatter).concat(quaidProJsonFile) , function (err, result) {
        if (err) console.log('error', err);
    });
        

}; //end foreach




