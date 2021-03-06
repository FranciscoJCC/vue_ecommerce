class PlatziReactive {
  //Dependencias
  deps = new Map();

  constructor(options) {
    this.origen = options.data();

    const self = this;

    //Destino
    this.$data = new Proxy(this.origen, {
      get(target, name) {
        /* if(name in target){ */
        if (Reflect.has(target, name)) {
          /* return target[name]; */
          self.track(target, name);
          return Reflect.get(target, name);
        }
        console.warn("La propierad", name, "no existe");
        return "";
      },
      set(target, name, value) {
        Reflect.set(target, name, value);
        self.trigger(name);
      },
    });
  }

  track(target, name) {
    if (!this.deps.has(name)) {
      const effect = () => {
        
        document.querySelectorAll(`*[p-text=${name}]`).forEach((el) => {
          this.pText(el, target, name);
        });


        document.querySelectorAll(`*[p-model=${name}]`).forEach((el) => {
            this.pModel(el, target, name);
        });

      };
      this.deps.set(name, effect);
    }
  }

  trigger(name) {
    const effect = this.deps.get(name);
    effect();
  }

  mount() {
    document.querySelectorAll("*[p-text]").forEach((el) => {
      this.pText(el, this.$data, el.getAttribute("p-text"));
    });

    document.querySelectorAll("*[p-model]").forEach((el) => {
      const name = el.getAttribute("p-model");
      this.pModel(el, this.$data, name);

      el.addEventListener("input", () => {
        /* this.$data[name] = el.value; */
        Reflect.set(this.$data, name, el.value);
      });
    });

    Array.from(document.querySelectorAll("*")).filter(el => {
        return [...el.attributes].some(
            attr => attr.name.startsWith('p-bind:')
        )
    }).forEach(el => {
        [...el.attributes].forEach(attribute => {
            const name = attribute.value;
            const attr = attribute.name.split(":").pop();

            this.pBind(el, this.$data, name, attr);
        });
    });
  }

  pText(el, target, name) {
    el.innerText = Reflect.get(target, name);
    /* el.innerText = target[name]; */
  }

  pModel(el, target, name) {
    el.value = Reflect.get(target, name);
    /* el.value = target[name]; */
  }

  pBind(el, target, name, attr){
      Reflect.set(el, attr, Reflect.get(target, name));
  }
}

var Platzi = {
  createApp(options) {
    return new PlatziReactive(options);
  },
};
