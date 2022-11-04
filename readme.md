# Introduction 
Idea here is to provide a way to execute terraform cdk and process the yaml file. This is one way to provide dev centric execution workflow. This code does the following:
1. Provides project centric way to overload the project metadata variable
2. Code reads the configuration from yaml, hence we don't need to learn the HCL. Anyone can create machines using templates. Thus this can be automated to support CICD based creation of resources
3. This program creates some of the interfaces that we dont need as we can reuse the existing cdk interfaces from the lib. This work is just done for ilustration purposes 



## Usage
> Compile the code `cdktf synth`

> Deploy the code `cdktf deploy` 
