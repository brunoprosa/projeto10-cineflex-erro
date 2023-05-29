export default function selecionar(id, selecionados, setSelecionados, isAvailable, nameSelecionados, setNameSelecionados, name){
    let aux = [];
    let aux1 = [];
    if(!isAvailable){
        alert("Esse assento não está disponível");
        return
    }
    if(selecionados.includes(id)){
        for(let i = 0; i < selecionados.length; i++){
            if(id === selecionados[i]) continue
            aux.push(selecionados[i]);
            aux1.push(nameSelecionados[i]);
        }
    }else{
        aux =[...selecionados];
        aux.push(id);
        aux1.push(name);
    }
    setSelecionados(aux);
    setNameSelecionados(aux1);
}