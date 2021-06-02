

// // 2. Using a function
// // NB: Chakra gives you access to `colorMode` and `theme` in `props`
// const theme = {
//   styles: {
//     global: (props) => ({
//       "html, body": {
//         fontSize: "sm",
//         color: props.colorMode === "dark" ? "white" : "gray.600",
//         lineHeight: "tall",
//       },
//       a: {
//         color: props.colorMode === "dark" ? "teal.300" : "teal.500",
//       },
//     }),
//   },
// }