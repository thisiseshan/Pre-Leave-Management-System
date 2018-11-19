var usernumber;

function AdminLogIn() {
    var x = document.getElementById("uname").value;
    var y = document.getElementById("psw").value;

    if (x=="test" && y=="test") {
      window.location.replace("admin.html");
} else {
    alert('You have entered invalid login information');
}
}

function UserPage() {
  window.location.replace("userpage.html");
}

function AdminPage() {
  window.location.replace("index.html");
}

function AddUser() {
    window.location.replace("newuser.html");
}


function NewUser() {
  var existingEntries = [];
  if (typeof(Storage) !== "undefined") {
    // Store
    var existingEntries = JSON.parse(localStorage.getItem("Teachers"));
    //data.push(existingEnteries);
    var x = document.getElementById("uname").value;
    var y = document.getElementById("psw").value;
    var z = document.getElementById("uid").value;
    var w = document.getElementById("did").value;
    //console.log(existingEntries);

    object = { "name": x, "password": y, "userid": z ,"departmentid": w , "remainingleaves": 30, "requestedleaves": 0, "totalleaves": 0, "approved": ""};
    if(existingEntries == null) existingEntries = [];
    for (var i = 0; i < existingEntries.length; i++) {
      if(""==existingEntries[i].name) {
        alert("Please use valid Login Details");
        return;
      }


        if(x==existingEntries[i].name) {
          alert("Username is already taken, Please select another username");
          return;
        }

    }
    existingEntries.push(object);

    var dat = JSON.stringify(existingEntries);

    localStorage.setItem("Teachers", dat);
    window.location.replace("userpage.html");

} else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
}
}

function UserLogIn() {
  var data = localStorage.getItem("Teachers");
  var obj = JSON.parse(data);

  var x = document.getElementById("uname").value||"";
  var y = document.getElementById("psw").value||"";

  for (var i = 0; i < obj.length; i++) {
  //  console.log(obj[1].name);
        if (obj[i].name == x) {
            if(y == obj[i].password) {
              usernumber = i;
            window.location.replace("dashboard.html" + "?cn=" + usernumber);
            //console.log(usernumber);
            //return;
          }
          else
          {
            alert('You have entered invalid login information');
            return;
          }
        }
    }
}

function Leave() {
  var data = localStorage.getItem("Teachers");
  var obj = JSON.parse(data);

  //var local = usernumber.toString();

//console.log(currUser);

  if(obj[currUser].remainingleaves <= 0) {
    alert('You Do Not Have Any Leaves Left.');
    obj[currUser].approved = "NO";
  }
  else {
      alert('You Have ' + obj[currUser].remainingleaves + " leaves left.");
     var x = prompt("Enter the number of leaves you wish to take");
     obj[currUser].requestedleaves = x;
     if(x > obj[currUser].remainingleaves) {
       alert("Please select fewer leaves");
       obj[currUser].approved = "NO";
     }
     else {
       obj[currUser].remainingleaves = obj[currUser].remainingleaves - x;
       obj[currUser].approved = "YES";
       obj[currUser].totalleaves = obj[currUser].totalleaves + '+' +x;
     }
}

localStorage.setItem("Teachers", JSON.stringify(obj));
alert('You currently have ' + obj[currUser].remainingleaves + ' leaves left.');


//report = {"userid": "", "approvedleaves": "", "rejectedleaved": "", totalleaves"}

}

function report() {

  var data = localStorage.getItem("Teachers");
  //var data2 = JSON.stringify(data);
  var obj = JSON.parse(data);
  var obj2 = obj;
  for (var i = 0; i < obj2.length; i++) {
      delete obj2[i].password;
}
//console.log(obj2);
  var data3 = JSON.stringify(obj2);
  //console.log(data3);
  data3 = data3.replace(/[\[\]']+/g,'')
  data3 = data3.replace(/{/g,' ')
  data3 = data3.replace(/}/g,' ')
  data3 = data3.replace(/,/g,"<br>")
  data3 = data3.replace(/"/g,'  ')
  data3 = data3.replace(/:/g,' ')
  data3 = data3.replace(/NO/g,'NO <br>')
  data3 = data3.replace(/YES/g,'YES <br>')
  data3 = data3.replace(/name/g,'Name:')
  data3 = data3.replace(/userid/g,'UserID:')
  data3 = data3.replace(/departmentid/g,'DepartmentID:')
  data3 = data3.replace(/leaves/g,'Leaves:')
  data3 = data3.replace(/requestedLeaves/g,'Requested Leaves')
  data3 = data3.replace(/totalLeaves/g,'Total Leaves')
  data3 = data3.replace(/remainingLeaves/g,'Remaining Leaves')
  data3 = data3.replace(/approved/g,'Approved:')

  for (var i = 0; i < data3.length; i++) {
      document.getElementById("welcome1").innerHTML = data3;
}

}
