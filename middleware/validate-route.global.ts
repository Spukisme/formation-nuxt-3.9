export default defineNuxtRouteMiddleware((to) => {
  console.log(useRouter())
  return isRouteValid(to)
})
