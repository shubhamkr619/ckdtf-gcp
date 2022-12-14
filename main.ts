import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { provider, computeInstance, serviceAccount } from "@cdktf/provider-google";
import { logger, readDir } from './util';
import { ProjectInfo } from "./process_object";


class CreateComputeInstanceStack extends TerraformStack {
  constructor(scope: Construct, name: string, projectInfo: ProjectInfo) {
    super(scope, name);
     new provider.GoogleProvider(this, `provider-${projectInfo.projectMeta?.project}-${projectInfo.projectMeta?.region}`,  projectInfo.projectMeta);

    const sa = new serviceAccount.ServiceAccount(this, "default", {
      accountId: "cdktf-accountid",
      displayName: "Service Account",
      description: "Created by CDKTF"
    });

    projectInfo.gcpObjects?.forEach(gcpObject => {
      gcpObject.instances.forEach(instance => {
        instance.serviceAccount.email = sa.email
        new computeInstance.ComputeInstance(this, instance.name, instance);
      });
    });     
}
}

// skshubham is the project name inside dev project.
const projectInfo = readDir('gcp_projects/dev-projects/skshubham/');
logger.debug(projectInfo);
const app = new App();
new CreateComputeInstanceStack(app, "cdktf_poc", projectInfo);
app.synth();
