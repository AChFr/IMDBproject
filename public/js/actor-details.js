document.addEventListener("load", actorDetails())


function actorDetails() {

    const actorID = document.getElementById("actor-id").innerText
    handler
        .getActorDetails(actorID)
        .then(result => {
            fillActorDetails(result.data.results[0])
        })
}

function fillActorDetails(obj) {

    document.getElementById("actor-name").innerText = obj.title
    document.getElementById("name-input").setAttribute("value", `${obj.title}`)
    document.getElementById("actor-description").innerText = obj.description
    document.getElementById("description-input").setAttribute("value", `${obj.description}`)
    document.getElementById("actor-image").setAttribute("src", `${obj.image}`)
    document.getElementById("image-input").setAttribute("value", `${obj.image}`)
}