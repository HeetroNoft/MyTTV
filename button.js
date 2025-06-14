// button.js
function createFavButton(isFav) {
  const btn = document.createElement("button");
  btn.id = "myttv-fav-btn";
  btn.title = isFav ? "Retirer des favoris" : "Ajouter aux favoris";
  btn.style.width = "40px";
  btn.style.height = "30px";
  btn.style.display = "flex";
  btn.style.alignItems = "center";
  btn.style.justifyContent = "center";
  btn.style.background = isFav ? "#9147ff" : "#2F2F36";
  btn.style.color = "#fff";
  btn.style.border = "none";
  btn.style.borderRadius = "4px";
  btn.style.cursor = "pointer";
  btn.style.zIndex = 1000;
  btn.innerHTML = isFav
    ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`
    : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
  return btn;
}

window.injectFavButton = function (retry = 0) {
  const channel = window.getChannelName();
  if (!channel) return;
  document.querySelectorAll("#myttv-fav-btn").forEach((btn) => btn.remove());
  const parentDiv = document.querySelector(".Layout-sc-1xcs6mc-0.csXQOq");
  if (!parentDiv) {
    if (retry < 5) {
      setTimeout(() => window.injectFavButton(retry + 1), 500);
    } else {
      console.warn(
        "[MyTTV] Impossible d'injecter le bouton favoris après 5 tentatives."
      );
    }
    return;
  }
  window.getFavorites((favs) => {
    let isFav = favs.includes(channel);
    const btn = createFavButton(isFav);
    btn.style.marginLeft = "10px";
    btn.style.marginRight = "0px";
    btn.onclick = () => {
      window.getFavorites((favs) => {
        let newFavs = favs.slice();
        let ajout = false;
        if (newFavs.includes(channel)) {
          newFavs = newFavs.filter((c) => c !== channel);
          isFav = false;
        } else {
          newFavs.push(channel);
          isFav = true;
          ajout = true;
        }
        window.setFavorites(newFavs, () => {
          btn.style.background = isFav ? "#9147ff" : "#2F2F36";
          btn.innerHTML = isFav
            ? `<svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"#fff\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\"/></svg>`
            : `<svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\"/></svg>`;
          // Ajout/suppression optimisé dans la sidebar
          const block = document.getElementById("myttv-sidebar-favs");
          if (block) {
            if (ajout) {
              if (typeof window.addSidebarFavorite === "function")
                window.addSidebarFavorite(channel);
            } else {
              if (typeof window.removeSidebarFavorite === "function")
                window.removeSidebarFavorite(channel);
            }
          }
        });
      });
    };
    parentDiv.insertBefore(btn, parentDiv.children[1]);
  });
};
