import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/utils/api";
import { ExternalLink, GlobeIcon, RefreshCcw } from "lucide-react";
import Link from "next/link";
import React from "react";
import { AddDomain } from "./add-domain";
import { DeleteDomain } from "./delete-domain";
import { GenerateDomain } from "./generate-domain";
import { UpdateDomain } from "./update-domain";

interface Props {
	applicationId: string;
}

export const ShowDomains = ({ applicationId }: Props) => {
	const { data } = api.domain.byApplicationId.useQuery(
		{
			applicationId,
		},
		{
			enabled: !!applicationId,
		},
	);
	return (
		<div className="flex w-full flex-col gap-5 ">
			<Card className="bg-background">
				<CardHeader className="flex flex-row items-center flex-wrap gap-4 justify-between">
					<div className="flex flex-col gap-1">
						<CardTitle className="text-xl">Domains</CardTitle>
						<CardDescription>
							Domains are used to access to the application
						</CardDescription>
					</div>

					<div className="flex flex-row gap-4 flex-wrap">
						{data && data?.length > 0 && (
							<AddDomain applicationId={applicationId}>
								<GlobeIcon className="size-4" /> Add Domain
							</AddDomain>
						)}
						{data && data?.length > 0 && (
							<GenerateDomain applicationId={applicationId} />
						)}
					</div>
				</CardHeader>
				<CardContent className="flex w-full flex-row gap-4">
					{data?.length === 0 ? (
						<div className="flex w-full flex-col items-center justify-center gap-3">
							<GlobeIcon className="size-8 text-muted-foreground" />
							<span className="text-base text-muted-foreground">
								To access to the application is required to set at least 1
								domain
							</span>
							<div className="flex flex-row gap-4 flex-wrap">
								<AddDomain applicationId={applicationId}>
									<GlobeIcon className="size-4" /> Add Domain
								</AddDomain>

								<GenerateDomain applicationId={applicationId} />
							</div>
						</div>
					) : (
						<div className="flex w-full flex-col gap-4">
							{data?.map((item) => {
								return (
									<div
										key={item.domainId}
										className="flex w-full items-center gap-4 max-sm:flex-wrap border p-4 rounded-lg"
									>
										<Link target="_blank" href={`http://${item.host}`}>
											<ExternalLink className="size-5" />
										</Link>

										<Input disabled value={item.host} />
										<Button variant="outline" disabled>
											{item.path}
										</Button>
										<Button variant="outline" disabled>
											{item.port}
										</Button>
										<Button variant="outline" disabled>
											{item.https ? "HTTPS" : "HTTP"}
										</Button>
										<div className="flex flex-row gap-1">
											<UpdateDomain domainId={item.domainId} />
											<DeleteDomain domainId={item.domainId} />
										</div>
									</div>
								);
							})}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};
