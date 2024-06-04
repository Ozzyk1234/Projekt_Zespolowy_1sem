import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

let list = [];
let endTime = new Date();
endTime.setMinutes(endTime.getMinutes() + 300);
let userInKitchenList = [
  {
    idKitchen: 1,
    idUser: 1,
    timeEnd: endTime,
  },
];
async function getKitchenList() {
  if (list.length < 1) {
    await init();
  }
  return list;
}

async function getUserInKitchenList(idKitchen) {
  await updateUserInKitchenList();
  return userInKitchenList.filter((x) => x.idKitchen == idKitchen);
}

async function addUserToKitchen(idKitchen, idUser, time) {
  await removeUserFromKitchen(idUser);
  let endTime = new Date();
  endTime.setMinutes(endTime.getMinutes() + time);
  userInKitchenList.push({
    idKitchen: idKitchen,
    idUser: idUser,
    timeEnd: endTime,
  });
}

async function removeUserFromKitchen(idUser) {
  userInKitchenList = userInKitchenList.filter((x) => x.idUser !== idUser);
}

async function updateUserInKitchenList() {
  let currentTime = new Date();
  userInKitchenList = userInKitchenList.filter(
    (event) => event.timeEnd.getTime() > currentTime.getTime()
  );
}

async function init() {
  const allKitchen = await prisma.kitchen.findMany();
  if (allKitchen.length > 0) {
    allKitchen.forEach((kitchen) => {
      list.push(kitchen);
    });
  } else {
    list = [];
    console.error("Brak kuchni!");
  }
}

module.exports = {
  getKitchenList,
  addUserToKitchen,
  getUserInKitchenList,
  removeUserFromKitchen,
};
