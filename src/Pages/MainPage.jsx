import React, {useEffect, useState} from 'react';

const MainPage = () => {
    const [fullName, setFullName]=useState("")
    const [name, setName]=useState("")
    const [inn, setInn]=useState("")
    const [filter, setFilter]=useState(false)
    const [address, setAddress]=useState("")
    let value = ""
    let text=""
    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
    var token = "57fcb84c9ede73402ded4856fcbddbab77b9d402";

    useEffect(()=>{
        value=document.getElementById("Input").value
        var options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({query: value})
        }
        fetch(url, options)
            .then(response => response.json())
            .then(result=>b(result))
            .catch(error => console.log("error", error))
        setFilter(false)
    }, [filter])


    const a =(ev) => {
        if (ev.keyCode == 13) {
            setFilter(true)

        }
        }
    const b =(data)=>{
        console.log(data)
        setName(data.suggestions[0].data.name.short_with_opf)
        setFullName(data.suggestions[0].data.name.full_with_opf)
        text = data.suggestions[0].data.inn + "/" + data.suggestions[0].data.kpp
        setInn(text)
        setAddress(data.suggestions[0].data.address.unrestricted_value)
        console.log(data.suggestions[0].data.address.unrestricted_value)
    }






    return (
        <div>
            <div className={"main"}>
                <span className={"text"}>Компания или ИП</span>
                <input
                    id={"Input"}
                    className={"input"}
                    placeholder={"ИИН "}
                    onKeyDown={a}/>
            </div>
            <div className={"main"}>
                <span className={"text"}>Краткое наименование</span>
                <input
                    className={"input__second"}
                    placeholder={"Краткое наименование"}
                    value={name}/>
            </div>
            <div className={"main"}>
                <span className={"text"}>Понлное наименование</span>
                <input
                    className={"input__second"}
                    placeholder={"Понлное наименование "}
                    value={fullName}/>
            </div>
            <div className={"main"}>
                <span className={"text"}>ИНН/КПП</span>
                <input
                    className={"input__second"}
                    placeholder={"ИНН/КПП "}
                    value={inn}/>
            </div>
            <div className={"main"}>
                <span className={"text"}>Адрес</span>
                <input
                    className={"input__second"}
                    placeholder={"Адрес"}
                    value={address}/>
            </div>

        </div>
    );
};

export default MainPage;