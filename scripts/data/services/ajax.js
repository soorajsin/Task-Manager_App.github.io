import {CONSTANTS} from "../../settings/config.js";

export async function doAjax() {
          try {
                    const reponse = await fetch(CONSTANTS.TASK_URL);
                    const json = await reponse.json();
                    return json; //wrapped in promise
          } catch (err) {
                    throw err;
          }
}