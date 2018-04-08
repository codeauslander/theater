/* global Vue, VueRouter, axios *import */

var MoviePage = {
  template: "#movie-page",
  data: function() {
    return {
      message: "Boom",
      movies: [],
      tickets: [],
      userId: 1,
      creditCard: "1234",
      expirationDate: "2018-11-19T14:37:48.000Z",
      total: 0,
      order: {}
    };
  },
  created: function() {
    axios.get("/movies").then(
      function(response) {
        this.movies = response.data;
        console.log(this.movies);
      }.bind(this)
    );
  },
  methods: {
    addTicket: function(movie) {
      var index = this.movies.indexOf(movie);
      this.movies[index].seats--;
      this.tickets.push({ movie_id: movie.id, movie_price: movie.price });
      this.total += movie.price;
    },
    orderTickets: function() {
      var params = {
        tickets: this.tickets,
        user_id: this.userId,
        credit_card: this.creditCard,
        expiration_date: this.expirationDate
      };
      axios.post("/orders", params).then(
        function(response) {
          console.log(response.data);
          this.order = response.data;

          console.log(this.order.id);
          axios.get("/tickets?order_id=" + this.order.id).then(
            function(response) {
              console.log(response.data);
              this.tickets = response.data;
            }.bind(this)
          );
        }.bind(this)
      );
    }
  }

  // updated: function() {},
  // computed: {},
  // props: {}
};

var router = new VueRouter({
  routes: [
    { path: "/", component: MoviePage }

    // { path: "/signup", component: SignupPage },
    // { path: "/login", component: LoginPage },
    // { path: "/logout", component: LogoutPage }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router,
  created: function() {
    // var jwt = localStorage.getItem("jwt");
    // console.log(jwt);
    // if (jwt) {
    //   axios.defaults.headers.common["Authorization"] = jwt;
    // }
  }
});

// Authorization Components
// var SignupPage = {
//   template: "#signup-page",
//   data: function() {
//     return {
//       name: "",
//       email: "",
//       password: "",
//       passwordConfirmation: "",
//       errors: []
//     };
//   },
//   methods: {
//     submit: function() {
//       var params = {
//         name: this.name,
//         email: this.email,
//         password: this.password,
//         password_confirmation: this.passwordConfirmation
//       };
//       axios
//         .post("/users", params)
//         .then(function(response) {
//           router.push("/login");
//         })
//         .catch(
//           function(error) {
//             this.errors = error.response.data.errors;
//           }.bind(this)
//         );
//     }
//   }
// };

// var LoginPage = {
//   template: "#login-page",
//   data: function() {
//     return {
//       email: "",
//       password: "",
//       errors: []
//     };
//   },
//   methods: {
//     submit: function() {
//       var params = {
//         auth: { email: this.email, password: this.password }
//       };
//       axios
//         .post("/user_token", params)
//         .then(function(response) {
//           axios.defaults.headers.common["Authorization"] =
//             "Bearer " + response.data.jwt;
//           localStorage.setItem("jwt", response.data.jwt);
//           router.push("/");
//         })
//         .catch(
//           function(error) {
//             this.errors = ["Invalid email or password."];
//             this.email = "";
//             this.password = "";
//           }.bind(this)
//         );
//     }
//   }
// };

// var LogoutPage = {
//   template: "#home-page",
//   created: function() {
//     axios.defaults.headers.common["Authorization"] = undefined;
//     localStorage.removeItem("jwt");
//     router.push("/");
//   }
// };
