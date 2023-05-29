export default function selecionar(id, selecionados, setSelecionados, isAvailable){
    console.log(id, selecionados)
    let aux = [];
    if(!isAvailable){
        alert("Esse assento não está disponível");
        return
    }
    if(selecionados.includes(id)){
        for(let i = 0; i < selecionados.length; i++){
            if(id === selecionados[i]) continue
            aux.push(selecionados[i]);
        }
    }else{
        aux =[...selecionados];
        aux.push(id);
    }
    setSelecionados(aux);
}