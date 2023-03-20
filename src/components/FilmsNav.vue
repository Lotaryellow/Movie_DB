<template>
  <nav>
    <div class="logo">
      <a href="/">
        <img src="../../public/img/logoNav.png" alt="logo" width="40" />
        <h2>Movie-DB</h2>
      </a>
      <a href="/random"><button class="rndFilms">Сулчайные Фильмы</button></a>
    </div>
    <form action="">
      <input type="text" />
      <button>Поиск</button>
    </form>
  </nav>
</template>
<script setup></script>
<style scoped lang="scss">
nav {
  width: 95%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.863);
  box-shadow: 0px 0px 20px rgb(4, 204, 204);
  border: 1px solid rgb(4, 204, 204);
  height: 70px;
  top: 20px;
  margin: 0px 50px 0px 50px;
}
.logo {
  display: flex;
  margin: 0px 0px 0px 25px;
  h2 {
    font-family: "Mynerve", cursive;
    padding: 8px 0px 0px 10px;
    font-size: 2rem;
    color: white;
  }
}
a {
  display: flex;
  font-size: 0.9rem;
}
button {
  width: 70px;
  height: 30px;
  font-size: 1rem;
  background-color: rgba(0, 255, 255, 0.856);
  margin-right: 15px;
  border: 1px solid rgb(4, 204, 204);
}
button:active {
  box-shadow: 0px 0px 20px rgb(4, 204, 204);
}
.rndFilms {
  width: 90px;
  display: flex;
  margin: 0px 0px 0px 20px;
}
input {
  font-size: 1rem;
  height: 30px;
  border: 1px solid rgb(4, 204, 204);
}
input:focus {
  box-shadow: 0px 0px 20px rgb(4, 204, 204);
}
</style>
