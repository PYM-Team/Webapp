<template>
<div>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{title}}
      </p>
      <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
    </header>
    <div class="card-content">
      <div class="content">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque sed blanditiis,
        assumenda repellendus tempore voluptatum eum! Aspernatur nam doloremque asperiores.
        Expedita vero ducimus alias repudiandae dolorem distinctio officia tempora quas.
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" @click="learn = true" class="card-footer-item">See more</a>
    </footer>
  </div>
  <b-modal :active.sync="learn" scroll="keep">
        <b-message title="Description" class= "is-primary has-text-centered is-size-5">
           <article class="is-centered has-text-centered"> {{description}} </article>
           <b-button tag="router-link" :to="{ path: '/Setup' }" class="button is-primary tile is-centered is-12" @click="createGame"> Start </b-button>
        </b-message>
  </b-modal>
</div>
</template>

<script>
export default {
  name: 'TemplateCard',
  data() {
    return {
      learn: false,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex erat, interdum eget nisl id, tincidunt pulvinar lacus. Vivamus at venenatis ex. Duis id sapien nulla. Aliquam lacinia venenatis lacus, sed ultrices nulla mollis sed. Mauris vestibulum mi purus, eu condimentum nisi ornare et. Nunc malesuada bibendum laoreet. Suspendisse eleifend quam sed libero venenatis sodales. In ut sollicitudin libero. Praesent diam dui, aliquam quis dignissim porta, vulputate vitae purus. Nam mattis metus vel turpis egestas rhoncus. Etiam consequat urna sit amet arcu fringilla, ac volutpat purus consectetur. Nam et ligula felis. Curabitur fringilla vitae elit sed elementum. Donec pharetra dui neque. Fusce a volutpat orci, sit amet mattis orci.Nulla ex lacus, tristique ut consectetur at, molestie porta odio. Praesent non est laoreet, sagittis ligula eget, consectetur nibh. Aliquam dignissim est vitae ex facilisis, in pretium sem volutpat. Proin a sapien nulla. In hac habitasse platea dictumst. Sed dignissim consequat leo, a lacinia arcu efficitur nec. Nam ultrices in metus eget elementum. Aliquam erat volutpat. Donec et semper nisl. Ut nec metus sit amet felis rhoncus dignissim ut sit amet urna. Morbi ut ante mattis, pulvinar nunc quis, volutpat ex. Etiam dapibus purus mauris, nec consectetur elit elementum sit amet. Aliquam ligula metus, mattis sit amet consequat imperdiet, molestie feugiat est. Curabitur nec lacus nec eros posuere tristique dignissim a ex. Sed interdum aliquam pulvinar.Nulla vel lectus non enim malesuada mattis. Suspendisse consequat elit velit, ut cursus quam pellentesque luctus. Nulla nec accumsan justo. Vestibulum sollicitudin, tellus quis congue facilisis, felis mauris elementum sapien, tristique egestas est tortor in nisl. Phasellus semper risus congue purus feugiat elementum. Donec vitae ipsum vel quam finibus porta. Mauris a ultricies augue. Nulla mattis non lectus eget dignissim. Proin nec eros malesuada, cursus nisi nec, posuere sem. Quisque maximus, lorem nec sodales fermentum, quam erat lobortis massa, a lobortis massa libero quis risus. Vivamus eu dignissim nisi. Integer condimentum ac quam a euismod. Nullam et arcu consectetur, ornare ipsum non, semper dolor.Aenean vitae condimentum massa. Integer semper feugiat libero, vel aliquam nulla tristique sit amet. Nam dignissim, purus id hendrerit molestie, ex ligula faucibus dolor, et pulvinar dui urna ut nisi. Nam sit amet mauris enim. Nulla eu auctor diam. Pellentesque convallis scelerisque metus et congue. Curabitur dolor nibh, facilisis eget libero ac, suscipit aliquam nunc.',
    };
  },
  props: {
    title: String,
  },
  methods: {
    createGame() {
      fetch('https://rpplanner-api.herokuapp.com/api/games', {
        method: 'post',
      })
        .then((res) => res.json())
        .then((data) => {
          this.$router.push({ name: 'Dashboard', params: { nameGame: this.title, idGame: '0001' } });
          console.log(data);
        })
        .catch(() => {
          console.log('error');
        });
    },
  },
};
</script>
