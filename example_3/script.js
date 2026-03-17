const roomData = {
  deluxe: {
    name: "De Luxe Room",
    capacity: "2 adults | 1 child below 7",
    price: "from $189 a night",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    description:
      "Elegantly appointed with warm wood accents and plush bedding, the De Luxe Room offers a tranquil retreat. Enjoy modern amenities including complimentary Wi-Fi, a rainfall shower, and a private balcony overlooking the gardens.",
  },
  seaview: {
    name: "De Luxe Sea View",
    capacity: "2 adults | 1 child below 7",
    price: "from $209 a night",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    description:
      "Wake up to panoramic ocean vistas in our De Luxe Sea View room. Floor-to-ceiling windows frame the coastline while you relax in a king-size bed with premium linens and enjoy the gentle sea breeze from your private terrace.",
  },
  family: {
    name: "The Wellhall Family Suite",
    capacity: "4 adults | 2 children below 7",
    price: "from $399 a night",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    description:
      "Designed for families who value space and comfort, The Wellhall Family Suite features a spacious living area, two luxurious bedrooms, and a dedicated children's corner. The suite includes a fully stocked minibar, two bathrooms, and a wraparound balcony.",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const roomCards = document.querySelectorAll(".room-card");
  const modalEl = document.getElementById("roomModal");
  const bsModal = new bootstrap.Modal(modalEl);

  roomCards.forEach((card) => {
    card.addEventListener("click", () => {
      const key = card.dataset.room;
      const room = roomData[key];
      if (!room) return;

      document.getElementById("roomModalLabel").textContent = room.name;
      document.getElementById("modalImage").src = room.image;
      document.getElementById("modalImage").alt = room.name;
      document.getElementById("modalCapacity").textContent = room.capacity;
      document.getElementById("modalPrice").textContent = room.price;
      document.getElementById("modalDescription").textContent =
        room.description;

      bsModal.show();
    });
  });
});
