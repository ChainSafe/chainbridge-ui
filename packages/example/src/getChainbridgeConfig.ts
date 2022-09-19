const CONFIG_SERVER_HOST = process.env.REACT_APP_CONFIG_SERVER_HOST
const CONFIG_SERVER_PORT = process.env.REACT_APP_CONFIG_SERVER_PORT

const getLocalConfig = () => fetch('/chainbridge-runtime-config.json').then(res => res.json())
const getConfigFromSSM =  () => fetch(`//${CONFIG_SERVER_HOST}:${CONFIG_SERVER_PORT}/config`).then(res => res.json())

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
