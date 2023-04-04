import router from "@/router";

export default {
  actSignUp(context, payload) {
    context.commit("mutShowLoader");
    const url = "http://www.pilceviclaw.rs/janko/api/signup/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        context.commit("mutHideLoader");
        context.commit("mutShowMessage", data);
        if (data.statusCode == 201) {
          router.push("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },

  actLogIn(context, payload) {
    context.commit("mutShowLoader");
    const url = "http://www.pilceviclaw.rs/janko/api/login/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        context.commit("mutLogIn", data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  actCreateCourse(context, payload) {
    context.commit("mutShowLoader");
    const url = "http://pilceviclaw.rs/janko/api/create-course/";
    const token = context.getters.getToken;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        context.commit("mutHideLoader");

        context.commit("mutShowMessage", data);
      });
  },
  actCreateTrening(context, payload) {
    const url = "http://pilceviclaw.rs/janko/api/create-obuka/";
    const token = context.getters.getToken;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        context.commit("mutShowMessage", data);
      });
  },
  actGetObuke(context, payload) {
    context.commit("mutShowLoader");

    const url = "http://pilceviclaw.rs/janko/api/obuke/";
    const token = context.getters.getToken;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        context.commit("mutGetObuke", data);
      });
  },
  actGetSveObuke(context, payload) {
    context.commit("mutShowLoader");

    const url = "http://pilceviclaw.rs/janko/api/sve-obuke/";
    const token = context.getters.getToken;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        context.commit("mutGetObuke", data);
      });
  },
  actCreateVrtic(context, payload) {
    const url = "http://pilceviclaw.rs/janko/api/create-vrtic/";
    const token = context.getters.getToken;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        context.commit("mutShowMessage", data);
      });
  },
  actGetCourses(context, payload) {
    const url = "http://pilceviclaw.rs/janko/api/courses/";
    const token = context.getters.getToken;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        context.commit("mutGetCourses", data);
      });
  },
  actGetVrtici(context, payload) {
    const url = "http://pilceviclaw.rs/janko/api/vrtici/";
    const token = context.getters.getToken;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        context.commit("mutGetVrtici", data);
      });
  },
  actGetUsers(context, payload) {
    const url = "http://pilceviclaw.rs/janko/api/users/";
    const token = context.getters.getToken;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        context.commit("mutGetUsers", data);
      });
  },
  actVerify(context, payload) {
    const url = "http://pilceviclaw.rs/janko/api/verify/";
    const token = context.getters.getToken;
    fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        context.commit("mutShowMessage", data);
        if (data.statusCode == 201) {
          context.dispatch("actGetUsers");
        }
      });
  },
  actDeleteObuka(context, payload) {
    const url = "http://pilceviclaw.rs/janko/api/del-obuka/";
    const token = context.getters.getToken;
    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        context.commit("mutShowMessage", data);
        context.dispatch("actGetObuke");
      });
  },
  actDeleteVrtic(context, payload) {
    const url = "http://pilceviclaw.rs/janko/api/del-vrtic/";
    const token = context.getters.getToken;
    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        context.commit("mutShowMessage", data);
        context.dispatch("actGetVrtici");
      });
  },
  actDeleteUser(context, payload) {
    const url = "http://pilceviclaw.rs/janko/api/del-korisnik/";
    const token = context.getters.getToken;
    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        context.commit("mutShowMessage", data);
        context.dispatch("actGetUsers");
      });
  },
  actDeleteKurs(context, payload) {
    const url = "http://pilceviclaw.rs/janko/api/del-kurs/";
    const token = context.getters.getToken;
    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        context.commit("mutShowMessage", data);
        context.dispatch("actGetCourses");
      });
  },
  actZavrsiObuku(context, payload) {
    const url = "http://pilceviclaw.rs/janko/api/zavrsi-obuku/";
    const token = context.getters.getToken;
    fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        context.commit("mutShowMessage", data);
        if (data.statusCode == 201) {
          context.dispatch("actGetObuke");
        }
      });
  },
};
