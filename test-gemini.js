async function test() {
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyCL6aLvDfwX6wF06h_Vx60hdxfWTIISY1I");
  const data = await response.json();
  console.log(JSON.stringify(data.models.map(m => m.name)));
}
test();
