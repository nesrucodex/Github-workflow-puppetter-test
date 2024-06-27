import { runTests as loginTest } from "./scripts/login.js";
import { runTests as createRepoTest } from "./scripts/create_repo.js";
import { runTests as forkRepoTest } from "./scripts/fork_repo.js";
import { runTests as commitChangesTest } from "./scripts/commit_changes.js";
import { runTests as pullRequestTest } from "./scripts/pull_request.js";

async function main() {
  try {
    // await loginTest();
    // await createRepoTest();
    // await forkRepoTest();
    // await commitChangesTest();
    await pullRequestTest();
  } catch (error) {
    console.error(error?.message);
  }
}

main();
