const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const movie = document.getElementById('movie')
let movieValue = +movie.value
const count = document.getElementById('count')
const total = document.getElementById('total')

populateUI()

function populateUI(){
    const selectedSeatsIndex = JSON.parse(localStorage.getItem('seatIndex'))

    if( selectedSeatsIndex !== null && selectedSeatsIndex.length > 0){
        seats.forEach((seat,index) => {
            if(selectedSeatsIndex.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    console.log(selectedMovieIndex)

    if(selectedMovieIndex !== null){
        movie.selectedIndex = selectedMovieIndex
    }
    

}

function setMovieData(selectedMovieIndex,selectedMovieValue){
    localStorage.setItem('selectedMovieIndex',selectedMovieIndex)
    localStorage.setItem('selectedMovieValue',selectedMovieValue)
}

function updateItems(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const selectedSeatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))
    localStorage.setItem('seatIndex',JSON.stringify(selectedSeatsIndex))
    
    count.innerText = +selectedSeats.length
    total.innerText= selectedSeats.length * movie.value
}


movie.addEventListener('change' , e=> {
    movieValue = e.target.value
    setMovieData(e.target.selectedIndex,e.target.value)
    updateItems()
})

container.addEventListener('click', e =>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
    }

    updateItems()
})

updateItems()