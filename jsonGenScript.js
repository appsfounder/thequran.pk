const fs = require('fs');
const path = require('path');

//Read all files

for(i=1; i <=114; i++){

    const jsonFilePath = path.normalize('data/surah/'+ i +'.json');
    let raw_data = fs.readFileSync(jsonFilePath);
    let productCatalogFromJson = JSON.parse(raw_data);
    
    console.log(i);
    console.log(productCatalogFromJson.result.name);
    
    const quaidFilePath = path.normalize('data/quaid.json');
    let quaid_raw_data = fs.readFileSync(quaidFilePath);
    let allQuaidFromJson = JSON.parse(quaid_raw_data);
    
    //Get Current Vendor Code and Product Code In Loop
    const SurahName = productCatalogFromJson.result.name;
    
    
    // Quaid Json File
    quaidProJsonFile = " ";
    
    
    productCatalogFromJson.result.text.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            console.log(`${value}`);
    
    
            var quaidContent = " ";
            var coloredAaya = `${value}`;
    
            //Check Quaid
            allQuaidFromJson.quaids.forEach(function(itm, ind, ar){
    
    
                if(value.includes(ar[ind].matchingWord)){
                    console.log('Quaid Matched ' + ar[ind].name + ' Successfully!');
                    if(quaidContent == " "){
                        
                        quaidContent = ar[ind].description + "," + ar[ind].color;
    
                        //var spl = coloredAaya.split(ar[ind].matchingWord);
    
                        //coloredAaya = spl.join(' {{%ayacolor "red" %}} '+ ar[ind].matchingWord +' {{% /ayacolor%}} ');
                        //console.log(coloredAaya);
                        
    
                    
                    }else{
    
                        quaidContent = quaidContent + "," +  ar[ind].description + "," + ar[ind].color;
                        
                        //var spl = coloredAaya.split(ar[ind].matchingWord);
    
                        //coloredAaya = spl.join(' {{%ayacolor "red" %}} '+ ar[ind].matchingWord+' {{% /ayacolor%}} ');
    
                        //console.log(coloredAaya);
                    
                    }
                }
    
    
            });
    
            quaidProJsonFile = quaidProJsonFile + "{{%ayat" + '"'+ `${key}` +'"%}}' + `${value}` + "{{% /ayat%}}" + '{{%expand "'+ "آیت میں استعمال شدہ قوائد" +'" %}}' + quaidContent + '{{% /expand%}}';
    
    
    
        });
        console.log('-------------------');
    });
    
    var frontMatter =   '---\ntitle: "' + "سورة " + productCatalogFromJson.result.name  + '"\ndraft: false\n---\n';
    
        fs.writeFile('content/surah/surah-'+ i +'.md',(frontMatter).concat(quaidProJsonFile) , function (err, result) {
            if (err) console.log('error', err);
        });
    
    
    }