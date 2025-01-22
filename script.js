console.log("hello world")

// let nsong
let song
let currfolder
let folder
let current_song = new Audio()
function secondsToMinuteSecond(seconds) {
   seconds = Math.floor(seconds); // Remove milliseconds by rounding down
   const mins = Math.floor(seconds / 60); // Extract minutes
   const secs = seconds % 60; // Extract remaining seconds

   // Format as 00:12
   return `${String(mins).padStart(2, 0)}:${String(secs).padStart(2, 0)}`;
}







async function playmusic(folder) {



   // --------------All songd appended on the screen------------------


   let a = await fetch(`http://127.0.0.1:3000/${folder}`)

   let b = await a.text()
   let div = document.createElement("div")
console.log(b)
   div.innerHTML = b
   let as = div.getElementsByTagName("a")

   songs.innerHTML = ""
   for (let i = 0; i < as.length; i++) {
      if (as[i].innerHTML.endsWith(".mp3")) {
         songs.innerHTML = songs.innerHTML + ` <span id="songcard" class="songcard">
       ${as[i].innerHTML.replaceAll("320", "").split("-")[1]}
     </span>`

      }
   }
   // -------------------All song in a array----------
   song = []
   for (let index = 0; index < as.length; index++) {

      const element = as[index].href;

      if (as[index].href.endsWith(".mp3")) {
         // console.log(as[index].href)
         song.push(element)

      }
   }

   // ------------------addEventListener to play a current song cards----------------
   let d = document.getElementById("songs").getElementsByTagName("span")

   for (let i = 0; i < d.length; i++) {
      d[i].addEventListener("click", function () {
         // console.log(i)


         current_song.src = song[i]
         current_song.play()
         play.src = "svg/pause.svg"


         // console.log(current_song)
         document.getElementById("curr_onseekbar").innerHTML = current_song.src.replaceAll("320", "").replaceAll("%20", " ").split("-")[1]





      });
   }


}
// -----to dispaly the albums dynamically on the screen
async function displayAlbum() {
   let Bunch_of_cards = document.querySelector(".Bunch_of_cards")
   let a = await fetch(`http://127.0.0.1:3000/song`)

   let b = await a.text()
   let div = document.createElement("div")
   div.innerHTML = b

   let anchors = div.getElementsByTagName("a")

   let array = Array.from(anchors)
   for (let index = 0; index < array.length; index++) {
      const e = array[index];

     
      if (e.href.includes("song")) {
        
         let folder = e.innerHTML
         
         let a = await fetch(`http://127.0.0.1:3000/song/${folder}info.json`)
        
         let b = await a.json()
         Bunch_of_cards.innerHTML = Bunch_of_cards.innerHTML + ` <div data-folder="${folder}" class="card">
                        <img class="song_photo" src="/song/${folder}cover.jpg.jpeg" alt="">
                        <div class="green_border">

                            <img height="25px" width="25px" class="green" src="svg/green.svg" alt="">
                        </div>
                        <div class="cover">
                            <h2>
                                ${b.titel}
                            </h2>

                            <div class="description">
                                ${b.descriptiion}
                            </div>
                        </div>

                    </div>
`

      }
   }


  // --------addEventListener for click on the card-------
   Array.from(document.getElementsByClassName("card")).forEach(async e => {
      e.addEventListener("click", async item => {
         //  file =   item.currentTarget.dataset.folder
         await playmusic(`song/${item.currentTarget.dataset.folder}`)
        
      
      })
   })

}





async function main() {





   await playmusic(`song/animalsongs`)

   displayAlbum()





   document.getElementById("curr_time").innerHTML = `${secondsToMinuteSecond(current_song.currentTime)}/${secondsToMinuteSecond(current_song.duration)}`
   document.getElementById("curr_onseekbar").innerHTML = await song[0].replaceAll("320", "").replaceAll("%20", " ").split("-")[1]
   

   // ------------------addevent listner to play button--------------
   play.addEventListener("click", (e) => {

      if (document.getElementById("curr_onseekbar").innerHTML === song[0].replaceAll("320", "").replaceAll("%20", " ").split("-")[1] && document.getElementById("curr_time").innerHTML === "00:00/NaN:NaN") {
         current_song.src = song[0]
         play.src = "svg/pause.svg"

         current_song.play()
      }

      else {

         if (current_song.paused) {
            current_song.play()
            play.src = "svg/pause.svg"
         

         }
         else {
           
            current_song.pause()
            play.src = "svg/play.svg"

         }
      }


   })








   // -------------addEventListener on the seekbar too update the time -------------
   current_song.addEventListener("timeupdate", () => {
      document.getElementById("curr_time").innerHTML = `${secondsToMinuteSecond(current_song.currentTime)}/${secondsToMinuteSecond(current_song.duration)}`
      document.querySelector(".circle").style.left = (current_song.currentTime / current_song.duration) * 100 + "%"
   })





   // --------------------addEventListener on the next buttton------------

   next.addEventListener("click", () => {

      let index = song.indexOf(current_song.src)
     

      current_song.src = song[index + 1]
      if (song.length === 1) {
         
         current_song.src = song[0]
         current_song.play()
         play.src = "svg/pause.svg"
         document.getElementById("curr_onseekbar").innerHTML = current_song.src.replaceAll("320", "").replaceAll("%20", " ").split("-")[1]
      }
      else if (document.getElementById("curr_time").innerHTML = "00:00/NaN:NaN" && document.getElementById("curr_onseekbar").innerHTML === song[0].replaceAll("320", "").replaceAll("%20", " ").split("-")[1]) {

        
         current_song.src = song[1]
         current_song.play()
         play.src = "svg/pause.svg"
         document.getElementById("curr_onseekbar").innerHTML = current_song.src.replaceAll("320", "").replaceAll("%20", " ").split("-")[1]
      }


      else {

         if (index === song.length - 1) {
            current_song.src = song[0]
            play.src = "svg/pause.svg"
            current_song.play()
            document.getElementById("curr_onseekbar").innerHTML = current_song.src.replaceAll("320", "").replaceAll("%20", " ").split("-")[1]

         } else {
            play.src = "svg/pause.svg"
            current_song.play()
            document.getElementById("curr_onseekbar").innerHTML = current_song.src.replaceAll("320", "").replaceAll("%20", " ").split("-")[1]
         }

      }

   })

   // ---------addEventListener on the previous button-----------
   previous.addEventListener("click", () => {

      let index = song.indexOf(current_song.src)
     
      current_song.src = song[index - 1]
      if (document.getElementById("curr_time").innerHTML = "00:00/NaN:NaN" && document.getElementById("curr_onseekbar").innerHTML === song[0].replaceAll("320", "").replaceAll("%20", " ").split("-")[1]) {

        
         current_song.src = song[song.length - 1]
         current_song.play()
         play.src = "svg/pause.svg"
         document.getElementById("curr_onseekbar").innerHTML = current_song.src.replaceAll("320", "").replaceAll("%20", " ").split("-")[1]
      }

      else {


         if (index === 0) {
            current_song.src = song[song.length - 1]
            play.src = "svg/pause.svg"
            current_song.play()
            document.getElementById("curr_onseekbar").innerHTML = current_song.src.replaceAll("320", "").replaceAll("%20", " ").split("-")[1]
         } else {
            play.src = "svg/pause.svg"
            current_song.play()
            document.getElementById("curr_onseekbar").innerHTML = current_song.src.replaceAll("320", "").replaceAll("%20", " ").split("-")[1]
         }
      }

   })









   // ----------addEventListener on the seekbar------------
   document.querySelector(".seekbar").addEventListener("click", (e) => {
      let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100

      document.querySelector(".circle").style.left = percent + "%"
      // document.querySelector(".circle").style.left = e.offsetX/e.target.getBoundingClientRect().width*100+"%"
      current_song.currentTime = ((current_song.duration) * percent) / 100
   })




   // addEventListener on the volume button

   document.querySelector(".volume").getElementsByTagName("input")[0].addEventListener("change", (e) => {
      current_song.volume = parseInt(e.target.value) / 100
     
   })


   // addEventListener on volume button
   document.getElementById("vol").addEventListener("click", (e) => {
      if (e.target.src.includes("svg/volume.svg")) {
         document.querySelector(".volume").getElementsByTagName("input")[0].value = 0
         vol.src = "svg/mute.svg"
         current_song.volume = document.querySelector(".volume").getElementsByTagName("input")[0].value
      } else if (e.target.src.includes("svg/mute.svg")) {
         document.querySelector(".volume").getElementsByTagName("input")[0].value = 30

         vol.src = "svg/volume.svg"
         e.target.value = 0.3
         current_song.volume = e.target.value

      }




   })

 












}
main()

















