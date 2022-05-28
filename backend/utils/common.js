

const GetMaskedData = (data) => {


    if(data===null){
        return 'Not Updated';
    }

    let text=data[0]+'XXXXX';

    if(data.length>0 && data.length<=2){
        text=data[0]+data[1]+data[2]+'XXXXX';
    }

    if(data.length>2 && data.length<=3){
        text=data[0]+data[1]+data[2]+'XXXXX';
    }

    if(data.length>4){
        text=data[0]+data[1]+data[2]+data[3]+'XXXXX';
    }


    return text;

};

module.exports.GetMaskedData=GetMaskedData;


