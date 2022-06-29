const getLocalConfig = () => fetch('/chainbridge-runtime-config.json').then(res => res.json())
const getConfigFromSSM =  () => fetch('http://localhost:8000/config').then(res => res.json())

export async function getConfigFromAWS(){
  let config
  console.log(process.env.NODE_ENV)
  console.log(process.env.AWS_ACCESS_KEY_ID)
  if (process.env.NODE_ENV === 'production') {
    config = await getLocalConfig()
  } else {
    config = await getConfigFromSSM()
  }
  return config;
}
