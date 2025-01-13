package com.camunda.academy;

import java.time.Instant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import io.camunda.zeebe.client.ZeebeClient;
import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.annotation.JobWorker;

@SpringBootApplication
@ComponentScan(basePackages = {"services"})
public class PaymentApplication {
	
	@Autowired
	private ZeebeClient client; // Will use later for sending messages
	
	/* For example: 
	 * 
	 * 		zeebeClient.newPublishMessageCommand().messageName("insertMessageNameHere").correlationKey("insertKeyHere").variables(job.getVariablesAsMap()).send().join(); 
	 * 
	 */
	
	private static Logger log = LoggerFactory.getLogger(PaymentApplication.class);

	public static void main(final String... args) {
		SpringApplication.run(PaymentApplication.class, args);
	}
	
	private static void logJob(final ActivatedJob job, Object parameterValue) {
	  
		log.info("complete job\n>>> [type: {}, key: {}, element: {}, workflow instance: {}]\n{deadline; {}]\n[headers: {}]\n[variable parameter: {}\n[variables: {}]",
				job.getType(),
				job.getKey(),
				job.getElementId(),
				job.getProcessInstanceKey(),
				Instant.ofEpochMilli(job.getDeadline()),
				job.getCustomHeaders(),
				parameterValue,
				job.getVariables());
	}

	@JobWorker(type = "credit-deduction") 
	public void handleCreditDeduction(final JobClient jobClient, final ActivatedJob job) {
		
		logJob(job, null);
	}
  
	@JobWorker(type = "credit-card-charging") 
	public void handleChargeCreditCard(final JobClient jobClient, final ActivatedJob job) {
		
		logJob(job, null);
	}
}
