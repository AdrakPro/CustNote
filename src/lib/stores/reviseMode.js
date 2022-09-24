import { createPersistentStore } from '$lib/utils/persistentStore.js';
import { REVISE_MODE } from '$lib/utils/constants.js';

export const reviseMode = createPersistentStore(REVISE_MODE, true);
