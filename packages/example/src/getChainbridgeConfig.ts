const getLocalConfig = () => fetch('/chainbridge-runtime-config.json').then(res => res.json())
const getConfigFromSSM =  () => fetch('http://localhost:8000/config').then(res => res.json())

export async function getChainbridgeConfig(){
  let config
  try {
    if (process.env.NODE_ENV === 'production') {
      config = await getConfigFromSSM()
    } else {
      config = await getLocalConfig()
    }
  } catch(e) {
    return { error: { message: "Failed to fetch" } };
  }

  return config;
}
