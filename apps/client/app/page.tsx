import TemplateHomeComponent from '../component/template-home.component';
import { checkSystemHealth } from '@shared/client';

async function checkHealth() {
  try {
    const healthRes = await checkSystemHealth();
    return healthRes.data!;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export default async function Home() {
  const healthCheckData = await checkHealth();
  return <TemplateHomeComponent healthCheckData={healthCheckData} />;
}
